import channelsData from '@/channels.json';
import { EntryAuthor } from '@/components/Entry';
import Layout from '@/components/Layout';
import { RoundedPanel } from '@/components/RoundedPane';
import styles from '@/styles/Read.module.css';
import { Article, Author, Doc } from '@/types/sharedTypes';
import { fetchHtml } from '@/utils/fetch';
import { decodePostUrl } from '@/utils/url';
import { Button, DivPx } from '@moai/core';
import { Readability } from '@mozilla/readability';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  HiOutlineArrowLeft as ArrowLeft,
  HiOutlineExternalLink as ExternalLink
} from 'react-icons/hi';
import Parser from 'rss-parser';

const CONTENT_PAGE_CACHE_TIME = 60 * 60 * 24 * 7; // 7 days

async function isArticleBelongsToAuthor(url: string, author: Author) {
  const parser = new Parser();
  const result = await parser.parseURL(author.url);
  const docs = result?.items ?? ([] as Doc[]);
  const isCorrectOwnership = docs.some((doc) => doc.link === url);
  return isCorrectOwnership;
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const params = context.params ?? {};
    const encoded = params?.encoded as string;
    const { author, url } = decodePostUrl(encoded);
    const matchedAuthor = channelsData.channels[author];

    if (!(await isArticleBelongsToAuthor(url, matchedAuthor))) {
      return {
        notFound: true
      };
    }

    const htmlContent = await fetchHtml(url);
    const doc = new JSDOM(htmlContent, { url });
    const DOMPurify = createDOMPurify(doc.window as unknown as Window);
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    return {
      revalidate: CONTENT_PAGE_CACHE_TIME,
      props: {
        article: {
          ...article,
          link: url,
          content: DOMPurify.sanitize(article?.content ?? '')
        },
        author: matchedAuthor
      }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

interface ReadPageProps {
  article: Article;
  author: Author;
}
const ReadPage = ({ article, author }: ReadPageProps) => {
  const router = useRouter();

  const backButtonClickHandler = () => {
    router.push('/');
  };

  return (
    <Layout
      title={`${article.title} | ${author.name} | WeBuild Community Blog`}
    >
      <RoundedPanel>
        <div className={styles.topNavigationSection}>
          <Button icon={ArrowLeft} onClick={backButtonClickHandler}>
            Quay về trang chủ
          </Button>
          <Button
            iconRight
            highlight
            icon={ExternalLink}
            href={article.link}
            target="_blank"
          >
            Đọc trên blog của tác giả
          </Button>
        </div>
        <DivPx size={32} />
        <EntryAuthor author={author} />
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <DivPx size={16} />
        <Button icon={ArrowLeft} onClick={backButtonClickHandler}>
          Quay về trang chủ
        </Button>
      </RoundedPanel>
    </Layout>
  );
};

export default ReadPage;
