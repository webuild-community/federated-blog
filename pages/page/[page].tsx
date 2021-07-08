import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Parser from 'rss-parser';
import { Entry } from '@/components/Entry';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import NodeCache from 'node-cache';
import channelsData from '@/channels.json';
import { Doc } from '@/types/sharedTypes';
import MaxHeap from '@/utils/MaxHeap';

type HeapNode = [Doc, number, number];

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
    docs = [];
    const docsArray: Array<Doc[]> = await Promise.all(
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
    );
    const maxHeap = new MaxHeap<HeapNode>((node1, node2) => {
      let dateNode1 = new Date(node1[0].pubDate as string);
      let dateNode2 = new Date(node2[0].pubDate as string);
      if (dateNode1 > dateNode2) {
        return 1;
      }
      if (dateNode1 == dateNode2) {
        return 0;
      }
      return -1;
    });
    for (let channel = 0; channel < docsArray.length; channel++) {
      if (docsArray[channel].length > 0) {
        maxHeap.push([docsArray[channel][0], channel, 0]);
      }
    }
    while (maxHeap.length > 0) {
      const [bePushedDoc, channel, indexOnChannel] = maxHeap.pop() as HeapNode;
      docs.push(bePushedDoc);
      if (indexOnChannel !== docsArray[channel].length - 1) {
        maxHeap.push([
          docsArray[channel][indexOnChannel + 1],
          channel,
          indexOnChannel + 1
        ]);
      }
    }
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
