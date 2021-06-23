import React from 'react';
import styles from '../styles/Home.module.css'
import { NextPageContext  } from 'next';
import Head from 'next/head';
import Parser from 'rss-parser';

const FEEDS = [
  "https://thefullsnack.com/rss",
  "https://zerox-dg.github.io/blog/rss.xml",
  "https://quancam.net/rss"
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

const Home = ({ docs }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBuild Community Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {docs.map(doc => (
          <a className={styles.entry} href={doc.link} key={doc.link}>
            <h3>{doc.title}</h3>
            <p>{new Date(doc.pubDate).toLocaleDateString()}</p>
            <span>{doc.link}</span>
            <p>{doc.content.replace(/^"/, '').replace(/"$/, '')}</p>
          </a>
        ))}
      </main>

    </div>
  )
};

export default Home;