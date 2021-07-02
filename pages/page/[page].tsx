import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Parser from 'rss-parser';
import { Entry } from '@/components/Entry';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import NodeCache from 'node-cache';
import channelsData from '@/channels.json';
import { Doc } from '@/types/sharedTypes';

const CACHE_DURATION = 60 * 60; // 1 hour cache
const cache = new NodeCache({ stdTTL: CACHE_DURATION });
const PAGE_SIZE = 20;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page = '1' } = context.params ?? {};
  const pageNumber = parseInt(page as string, 10);
  const parser = new Parser();
  let docs = cache.get<Doc[]>('docs');
  if (!docs) {
    docs = (
      await Promise.all(
        channelsData.channels.map(async (channel, channelIndex) => {
          const result = await parser.parseURL(channel.url);
          return (
            result?.items.map((item) => ({
              ...item,
              author: channel,
              authorId: channelIndex
            })) ?? []
          );
        })
      )
    ).flat();
    docs.sort((a, b) => {
      let da = new Date(b.pubDate as string);
      let db = new Date(a.pubDate as string);
      return +da - +db;
    });
    cache.set('docs', docs);
  }
  let pageCache = cache.get<Doc[]>(`docs-page-${page}`);
  if (!pageCache) {
    pageCache = docs.slice(
      (pageNumber - 1) * PAGE_SIZE,
      pageNumber * PAGE_SIZE
    );
    cache.set(`docs-page-${page}`, pageCache);
  }
  return {
    revalidate: CACHE_DURATION,
    props: {
      docs: pageCache,
      page: pageNumber,
      totalPages: Math.ceil(docs.length / PAGE_SIZE)
    }
  };
};
interface HomeProps {
  page: number;
  totalPages: number;
  docs: Doc[];
}

const Home = ({ docs, page, totalPages }: HomeProps) => {
  return (
    <Layout>
      {docs.map((doc) => (
        <Entry doc={doc} key={doc.link} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onSelect={(page) => {
          window.location.href = `/page/${page}`;
        }}
      />
    </Layout>
  );
};

export default Home;
