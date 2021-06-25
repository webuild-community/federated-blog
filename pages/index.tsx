import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import { Button, DivPx, Tag } from '@moai/core';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { getHostName } from '../utils/url';
import { excerpt, minimum as minimumStringLength } from '../utils/string';

const FEEDS = [
  'https://thefullsnack.com/rss',
  'https://zerox-dg.github.io/blog/rss.xml',
  'https://quancam.net/rss',
  'https://learnlingo.co/feed/',
  'https://thuc.space/index.xml',
  'https://beautyoncode.com/feed/',
  'https://xluffy.github.io/index.xml',
  'https://tuhuynh.com/rss.xml',
  'https://ehkoo.com/rss.xml',
  'https://anhdung.me/feed/',
  'https://blog.tracelog.in/feed',
  'https://namtx.dev/feed.xml',
  'https://coder7een.github.io/feed.xml'
];

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const parser = new Parser();
  const docs = (
    await Promise.all(
      FEEDS.map(async (url) => (await parser.parseURL(url)).items)
    )
  ).flat();
  docs.sort((a, b) => {
    let da = new Date(b.pubDate);
    let db = new Date(a.pubDate);
    return +da - +db;
  });
  return {
    props: {
      docs: docs
    }
  };
};

const LoadingEntry = () => {
  return (
    <div
      style={{
        marginBottom: '32px',
        padding: '22px',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-1)'
      }}
    >
      <h1>
        <Skeleton />
      </h1>
      <Skeleton count={5} />
    </div>
  );
};

const Entry = ({ doc }) => {
  return (
    <div
      style={{
        marginBottom: '32px',
        padding: '22px',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-1)'
      }}
    >
      <Tag color={Tag.colors.gray}>{getHostName(doc.link)}</Tag>
      <h3>
        <Link href={`/read?url=${encodeURIComponent(doc.link)}`}>
          <a>{doc.title}</a>
        </Link>
      </h3>
      <p>Đăng ngày {new Date(doc.pubDate).toLocaleDateString()}</p>
      <p>{excerpt(minimumStringLength(doc.contentSnippet, 5), 50)}</p>
      <div className={styles.readMoreArea}>
        <Link href={`/read?url=${encodeURIComponent(doc.link)}`}>
          <Button highlight>Đọc tiếp</Button>
        </Link>
        <Button iconRight icon={externalLink} href={doc.link} target="_blank">
          Đọc trên blog của tác giả
        </Button>
      </div>
    </div>
  );
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
        {docs.slice(0, loadCount).map((doc) => (
          <LazyLoad key={doc.link} placeholder={<LoadingEntry />}>
            <Entry doc={doc} />
          </LazyLoad>
        ))}
        {loadCount < docs.length && (
          <Button
            fill
            onClick={() => {
              setLoadCount(loadCount + 25);
            }}
          >
            Xem thêm bài viết...
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
