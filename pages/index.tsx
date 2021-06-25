import React, { useState } from 'react';
import { NextPageContext } from 'next';
import Parser from 'rss-parser';
import LazyLoad from 'react-lazyload';
import { Button } from '@moai/core';
import { Entry, LoadingEntry } from '../components/Entry';
import Layout from '../components/Layout';

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
  'https://coder7een.github.io/feed.xml',
  'https://monodyle.github.io/rss.xml',
  'https://duynglam.com/index.xml'
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

const Home = ({ docs }) => {
  const [loadCount, setLoadCount] = useState(25);
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
