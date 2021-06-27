import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, DivPx } from '@moai/core';
import { HiOutlineArrowLeft as LeftArrow } from 'react-icons/hi';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { fetchHtml } from '../utils/fetch';
import { RoundedPanel } from '../components/RoundedPane';
import Layout from '../components/Layout';
import styles from '../styles/Read.module.css';

export const getServerSideProps = async (context) => {
  const { url } = context.query;
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  return {
    props: { article }
  };
};

const ReadPage = ({ article }) => {
  const router = useRouter();
  const { url } = router.query;

  const backButtonClickHandler = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <Layout>
      <RoundedPanel>
        <div className={styles.topNavigationSection}>
          <Button icon={LeftArrow} onClick={backButtonClickHandler}>
            Quay về trang chủ
          </Button>
          <Button
            iconRight
            highlight
            icon={externalLink}
            href={url as string}
            target="_blank"
          >
            Đọc trên blog của tác giả
          </Button>
        </div>
        <DivPx size={16} />

        <h1>{article.title}</h1>
        <div
          className="justify"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
        <DivPx size={16} />
        <Button icon={LeftArrow} onClick={backButtonClickHandler}>
          Quay về trang chủ
        </Button>
      </RoundedPanel>
    </Layout>
  );
};

export default ReadPage;
