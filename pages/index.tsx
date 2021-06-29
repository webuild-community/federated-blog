import React from 'react';
import { NextPageContext } from 'next';
import Parser from 'rss-parser';
import { Button } from '@moai/core';
import NodeCache from 'node-cache';
import {
  HiOutlineChevronLeft as PrevIcon,
  HiOutlineChevronRight as NextIcon
} from 'react-icons/hi';
import Link from 'next/link';
import { Entry } from '../components/Entry';
import Layout from '../components/Layout';
import { RoundedPanel } from '../components/RoundedPane';
import styles from '../styles/Home.module.css';
import channelsData from '../channels.json';
import { Doc } from '../types/sharedTypes';

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
  let docs = cache.get<RSSItems>('docs');
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
      //     Overload 1 of 4, '(value: string | number | Date): Date', gave the following error.
      //     Argument of type 'string | undefined' is not assignable to parameter of type 'string | number | Date'.
      //       Type 'undefined' is not assignable to type 'string | number | Date'.
      //   Overload 2 of 4, '(value: string | number): Date', gave the following error.
      //     Argument of type 'string | undefined' is not assignable to parameter of type 'string | number'.
      //       Type 'undefined' is not assignable to type 'string | number'.
      // 46       let da = new Date(b.pubDate);
      // @ts-ignore
      let da = new Date(b.pubDate);
      // @ts-ignore
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
      <RoundedPanel transparent={true}>
        <div className={styles.paginationSection}>
          {page > 1 ? (
            <Link href={`/?page=${page - 1}`} passHref>
              <Button icon={PrevIcon}>Trang trước</Button>
            </Link>
          ) : (
            <div />
          )}
          {totalPages > 1 && (
            <div className={styles.paginationInfo}>
              Trang {page} / {totalPages}
            </div>
          )}
          {page < totalPages ? (
            <Link href={`/?page=${page + 1}`} passHref>
              <Button icon={NextIcon} iconRight>
                Trang sau
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </RoundedPanel>
    </Layout>
  );
};

export default Home;
