import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import { Button, DivPx } from '@moai/core';
import { HiOutlineArrowLeft as LeftArrow } from 'react-icons/hi';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { fetchHtml } from '../utils/fetch';
import { RoundedPanel } from '../components/RoundedPane';
import Layout from '../components/Layout';
import styles from '../styles/Read.module.css';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.url as string;
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const DOMPurify = createDOMPurify(doc.window as unknown as Window);
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  return {
    props: {
      article: {
        ...article,
        // TODO: handle error Object is possibly 'null'
        // @ts-ignore
        content: DOMPurify.sanitize(article.content)
      }
    }
  };
};
interface Article {
  title: string;
  // html content
  content: string;
}
interface ReadPageProps {
  article: Article;
}
const ReadPage = ({ article }: ReadPageProps) => {
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
        />

        <DivPx size={16} />
        <Button icon={LeftArrow} onClick={backButtonClickHandler}>
          Quay về trang chủ
        </Button>
      </RoundedPanel>
    </Layout>
  );
};

export default ReadPage;
