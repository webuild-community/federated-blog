import channelsData from '@/channels.json';
import Layout from '@/components/Layout';
import { Author } from '@/types/sharedTypes';
import { getAvatarUrl, getHostName } from '@/utils/url';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Author.module.css';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      authors: channelsData.channels
    }
  };
};

interface AuthorProps {
  authors: Author[];
}

const AuthorPage = ({ authors }: AuthorProps) => {
  const renderAuthor = (author: Author) => {
    const { name, avatar_url, url } = author;
    const hostName = getHostName(url);
    const blogUrl = `https://${hostName}`;

    return (
      <div className={styles.blogAuthor}>
        <div className={styles.blogAvatar}>
          <Image
            alt={name}
            src={getAvatarUrl(avatar_url)}
            width={60}
            height={60}
          />
        </div>
        <div className={styles.blogInfo}>
          <Link href={blogUrl} passHref>
            <a>{name}</a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.blogPage}>
        <h3>Thanks to contributed</h3>
        <div className={styles.blogAuthors}>
          {authors.map((author, idx) => (
            <div
              key={idx}
              style={{
                width: '20%'
              }}
            >
              {renderAuthor(author)}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
