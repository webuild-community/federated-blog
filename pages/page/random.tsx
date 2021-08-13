import { fetchDocs } from '@/utils/fetch';
import { encodePostUrl } from '@/utils/url';

export const getServerSideProps = async () => {
  const docs = await fetchDocs();
  const randomDoc = docs[Math.floor(Math.random() * docs.length)];
  const encodedUrl = encodePostUrl(
    randomDoc.link as string,
    randomDoc.authorId
  );
  return {
    redirect: {
      destination: `/read/${encodedUrl}`
    }
  };
};

const RandomPage = () => null;
export default RandomPage;
