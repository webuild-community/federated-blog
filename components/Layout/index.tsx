import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';
import Header from '../Header';

const Layout = ({ children, title }) => {
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
