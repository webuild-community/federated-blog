import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import { Button, DivPx } from '@moai/core';
import { HiOutlineArrowLeft as LeftArrow } from 'react-icons/hi';
import { HiOutlineExternalLink as ExternalLink } from 'react-icons/hi';
import { fetchHtml } from '@/utils/fetch';
import { RoundedPanel } from '@/components/RoundedPane';
import Layout from '@/components/Layout';
import styles from '@/styles/Read.module.css';
import { GetServerSideProps } from 'next';
import channelsData from '@/channels.json';
import { EntryAuthor } from '@/components/Entry';
import { decodePostUrl } from '@/utils/url';
import { Author } from '@/types/sharedTypes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoded = context.query.encoded as string;
  const { author, url } = decodePostUrl(encoded);
  const htmlContent = await fetchHtml(url);
  const doc = new JSDOM(htmlContent, { url });
  const DOMPurify = createDOMPurify(doc.window as unknown as Window);
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  const matchedAuthor = channelsData.channels[author];

  return {
    props: {
      article: {
        ...article,
        content: DOMPurify.sanitize(article?.content ?? '')
      },
      author: matchedAuthor
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
  author: Author;
}
const ReadPage = ({ article, author }: ReadPageProps) => {
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
            icon={ExternalLink}
            href={url as string}
            target="_blank"
          >
            Đọc trên blog của tác giả
          </Button>
        </div>
        <DivPx size={32} />
        <EntryAuthor author={author} />
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
