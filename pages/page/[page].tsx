import { Entry } from '@/components/Entry';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { Doc } from '@/types/sharedTypes';
import { fetchDocs } from '@/utils/fetch';
import { GetStaticPaths, GetStaticProps } from 'next';
import NodeCache from 'node-cache';
import React from 'react';

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
  let docs = cache.get<Doc[]>('docs');
  if (!docs) {
    docs = await fetchDocs();
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

  const totalPages = Math.ceil(docs.length / PAGE_SIZE);
  if (pageCache.length <= 0 || pageNumber > totalPages) {
    return {
      notFound: true
    };
  }
  return {
    revalidate: CACHE_DURATION,
    props: {
      docs: pageCache,
      page: pageNumber,
      totalPages: totalPages
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
