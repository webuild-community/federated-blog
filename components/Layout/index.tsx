import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

const Layout = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: 'WeBuild Community Blog'
};

export default Layout;
