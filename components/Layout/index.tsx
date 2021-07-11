import Head from 'next/head';
import React from 'react';
import styles from './Layout.module.css';
import Header from '../Header';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}
const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: 'WeBuild Community Blog'
};

export default Layout;
