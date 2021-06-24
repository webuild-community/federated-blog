import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import { NextPageContext  } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import { Button, DivPx, Tag } from '@moai/core';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';

const FEEDS = [
  "https://thefullsnack.com/rss",
  "https://zerox-dg.github.io/blog/rss.xml",
  "https://quancam.net/rss",
  "https://learnlingo.co/feed/",
  "https://thuc.space/index.xml",
  "https://beautyoncode.com/feed/",
  "https://xluffy.github.io/index.xml",
  "https://tuhuynh.com/rss.xml",
  "https://ehkoo.com/rss.xml",
  "https://anhdung.me/feed/",
  "https://blog.tracelog.in/feed",
  "https://namtx.dev/feed.xml",
  "https://coder7een.github.io/feed.xml"
];

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const parser = new Parser();
  const docs = (await Promise.all(FEEDS.map(async url => (await parser.parseURL(url)).items))).flat();
  docs.sort((a, b) => {
    let da = new Date(b.pubDate);
    let db = new Date(a.pubDate);
    return +da - +db;
  });
  return {
    props: {
      docs: docs
    }
  }
};

const getHostName = (url) => {
  const [host, _] = url.replace(/https?:\/\//, '').split('/');
  return host;
}

const LoadingEntry = () => {
  return (
    <div style={{ marginBottom: '32px', padding: '22px', background: '#FFFFFF', borderRadius: 'var(--radius-1)' }}>
      <h1><Skeleton/></h1>
      <Skeleton count={5}/>
    </div>
  )
}

const Entry = ({ doc }) => {
  return (
    <div style={{ marginBottom: '32px', padding: '22px', background: '#FFFFFF', borderRadius: 'var(--radius-1)' }}>
      <Tag color={Tag.colors.gray}>{getHostName(doc.link)}</Tag>
      <Link href={`/read?url=${doc.link}`}><h3>{doc.title}</h3></Link>
      <p>Posted on {new Date(doc.pubDate).toLocaleDateString()}</p>
      <p dangerouslySetInnerHTML={{ __html: doc.content.replace(/^"/, '').replace(/"$/, '') }}></p>
      <div className={styles.readMoreArea}>
        <Link href={`/read?url=${doc.link}`}>
          <Button highlight>Read more...</Button>
        </Link>
        <Link href={doc.link}>
          <Button iconRight icon={externalLink}>Original link</Button>
        </Link>
      </div>
    </div>
  )
};

const Home = ({ docs }) => {
  const [loadCount, setLoadCount] = useState(25);
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBuild Community Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {docs.slice(0, loadCount).map(doc => (
          <LazyLoad key={doc.link} placeholder={<LoadingEntry/>}>
            <Entry doc={doc} />
          </LazyLoad>
        ))}
        {loadCount < docs.length && (
          <Button
            fill
            onClick={() => {
              setLoadCount(loadCount+25)
            }}
          >Load more...</Button>
        )}
      </main>

    </div>
  )
};

export default Home;