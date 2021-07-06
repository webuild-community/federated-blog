import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import { Button, DivPx } from '@moai/core';
import {
  HiOutlineArrowLeft as ArrowLeft,
  HiOutlineExternalLink as ExternalLink
} from 'react-icons/hi';
import { fetchHtml } from '@/utils/fetch';
import { RoundedPanel } from '@/components/RoundedPane';
import Layout from '@/components/Layout';
import styles from '@/styles/Read.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import channelsData from '@/channels.json';
import { EntryAuthor } from '@/components/Entry';
import { decodePostUrl } from '@/utils/url';
import { Author } from '@/types/sharedTypes';

const CONTENT_PAGE_CACHE_TIME = 60 * 60 * 2; // 2 days

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params ?? {};
  const encoded = params?.encoded as string;
  const { author, url } = decodePostUrl(encoded);
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const DOMPurify = createDOMPurify(doc.window as unknown as Window);
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  const matchedAuthor = channelsData.channels[author];

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
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

interface Article {
  title: string;
  // html content
  content: string;
  // original link
  link: string;
}
interface ReadPageProps {
  article: Article;
  author: Author;
}
const ReadPage = ({ article, author }: ReadPageProps) => {
  const router = useRouter();

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
