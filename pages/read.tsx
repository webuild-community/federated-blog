import { NextPageContext } from 'next';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import styles from '../styles/Home.module.css';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, DivPx } from '@moai/core';
import { HiOutlineArrowLeft as LeftArrow } from 'react-icons/hi';

const fetchHtml = async (url) => {
  const res = await fetch(url);
  return await res.text();
};

export const getServerSideProps = async (context) => {
  const { url } = context.query;
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  console.log(article);
  return {
    props: { article }
  };
};

const ReadPage = ({ article }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBuild Community Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <Button icon={LeftArrow}>Back to home page</Button>
        </Link>
        <DivPx size={16} />
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        <DivPx size={16} />
        <Link href="/">
          <Button icon={LeftArrow}>Back to home page</Button>
        </Link>
      </main>
    </div>
  );
};

export default ReadPage;
