import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Parser from 'rss-parser';
import { Entry } from '../components/Entry';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import NodeCache from 'node-cache';
import channelsData from '../channels.json';

const CACHE_DURATION = 60 * 15; // 15 minutes cache
const cache = new NodeCache({ stdTTL: CACHE_DURATION });
const PAGE_SIZE = 20;

type RSSItems = ({
  [key: string]: any;
} & Parser.Item)[];

export const getServerSideProps = async (context: NextPageContext) => {
  const { page = '1' } = context.query;
  const pageNumber = parseInt(page as string, 10);
  const parser = new Parser();
  let docs: RSSItems = cache.get('docs');
  if (!docs) {
    docs = (
      await Promise.all(
        channelsData.channels.map(async (channel) => {
          const result = await parser.parseURL(channel.url);
          return (
            result?.items.map((item) => ({
              ...item,
              author: channel
            })) ?? []
          );
        })
      )
    ).flat();
    docs.sort((a, b) => {
      let da = new Date(b.pubDate);
      let db = new Date(a.pubDate);
      return +da - +db;
    });
    cache.set('docs', docs);
  }
  return {
    props: {
      docs: docs.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE),
      page: pageNumber,
      totalPages: Math.ceil(docs.length / PAGE_SIZE)
    }
  };
};

const Home = ({ docs, page, totalPages }) => {
  const router = useRouter();
  return (
    <Layout>
      {docs.map((doc) => (
        <Entry doc={doc} key={doc.link} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onSelect={(page) => {
          router.push(`/?page=${page}`);
        }}
      />
    </Layout>
  );
};

export default Home;
