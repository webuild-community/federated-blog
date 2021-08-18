import Layout from '@/components/Layout';
import Link from 'next/link';
import styles from './WeBuild404.module.css';

export default function Custom404() {
  return (
    <Layout>
      {/* <Image src="/404.png" width="200" height="200"/> */}
      <h2 className={styles.heading}>404</h2>
      <p className={styles.paragraph}>
        <strong>Trang này không tồn tại</strong>
        <br />
        Nhấn <Link href="/">vào đây</Link> để quay lại trang chủ
      </p>
    </Layout>
  );
}
