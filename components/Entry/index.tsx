import React from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { Button, Tag } from '@moai/core';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { getHostName } from '../../utils/url';
import { excerpt, minimum as minimumStringLength } from '../../utils/string';
import { RoundedPanel } from '../RoundedPane';
import styles from './Entry.module.css';

export const LoadingEntry = () => {
  return (
    <RoundedPanel>
      <h1>
        <Skeleton />
      </h1>
      <Skeleton count={5} />
    </RoundedPanel>
  );
};

export const Entry = ({ doc }) => {
  return (
    <RoundedPanel>
      <Tag color={Tag.colors.gray}>{getHostName(doc.link)}</Tag>
      <h3 className="entry-title">
        <a href={`/read?url=${encodeURIComponent(doc.link)}`}>{doc.title}</a>
      </h3>
      <p>Đăng ngày {new Date(doc.pubDate).toLocaleDateString()}</p>
      <p className="justify">
        {excerpt(minimumStringLength(doc.contentSnippet, 5), 50)}
      </p>
      <div className={styles.readMoreArea}>
        <Link href={`/read?url=${encodeURIComponent(doc.link)}`} passHref>
          <Button highlight>Đọc tiếp</Button>
        </Link>
        <Button iconRight icon={externalLink} href={doc.link} target="_blank">
          Đọc trên blog của tác giả
        </Button>
      </div>
    </RoundedPanel>
  );
};
