import Layout from '@/components/Layout';
import Link from 'next/link';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <Layout>
      <h2 className={styles.heading}>404</h2>
      <p className={styles.paragraph}>
        <strong>Trang này không tồn tại</strong>
        <br />
        Nhấn{' '}
        <Link href="/page/1">
          <a>vào đây</a>
        </Link>{' '}
        để quay lại trang chủ
      </p>
    </Layout>
  );
}
