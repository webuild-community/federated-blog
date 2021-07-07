import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Parser from 'rss-parser';
import Layout from '@/components/Layout';
import channelsData from '@/channels.json';
import { Author, Doc } from '@/types/sharedTypes';
import { getAvatarUrl, getHostName } from '@/utils/url';
import { Entry } from '@/components/Entry';
import Link from 'next/link';
import styles from './Author.module.css';
import { HiOutlineLink, HiOutlineRss, HiOutlineDocument } from 'react-icons/hi';
import { Icon } from '@moai/core';

const CACHE_DURATION = 60 * 60; // 1 hour cache

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { host } = context.params ?? {};
  const parser = new Parser();
  const authorId = channelsData.channels.findIndex(
    (channel) => getHostName(channel.url) === host
  );
  const author = channelsData.channels[authorId] ?? null;
  let docs: Doc[] = [];
  if (author) {
    const author = channelsData.channels[authorId];
    const result = await parser.parseURL(author.url);
    docs =
      result?.items.map((item) => ({
        ...item,
        authorId,
        author
      })) ?? [];
    docs.sort((a, b) => {
      let da = new Date(b.pubDate as string);
      let db = new Date(a.pubDate as string);
      return +da - +db;
    });
  }

  return {
    revalidate: CACHE_DURATION,
    props: {
      docs,
      author
    }
  };
};
interface HomeProps {
  docs: Doc[];
  author?: Author;
}

const AuthorPage = ({ docs, author }: HomeProps) => {
  const rssLinkDisplay = author?.url.replace(/https?:\/\//, '');
  const blogLink = `https://${getHostName(author.url)}`;
  return author ? (
    <Layout>
      <div className={styles.bigAssProfile}>
        <div className={styles.avatarContainer}>
          <Image
            alt={author.name}
            src={getAvatarUrl(author.avatar_url)}
            width={120}
            height={120}
          />
        </div>
        <h2 className={styles.bigAssProfile_Name}>{author.name}</h2>
        <div className={styles.profileDetails}>
          <Link href={blogLink} passHref>
            <a className={styles.profileLink}>
              <Icon component={HiOutlineLink} /> {getHostName(author.url)}
            </a>
          </Link>
          <Link href={author.url} passHref>
            <a className={styles.profileLink}>
              <Icon component={HiOutlineRss} /> {rssLinkDisplay}
            </a>
          </Link>
          <div className={styles.profileLink}>
            <Icon component={HiOutlineDocument} /> {docs.length} bài viết
          </div>
        </div>
      </div>
      {docs.map((doc) => (
        <Entry doc={doc} key={doc.link} showAuthor={false} />
      ))}
    </Layout>
  ) : (
    <Layout>Content not found</Layout>
  );
};

export default AuthorPage;
