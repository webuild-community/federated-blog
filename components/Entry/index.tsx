import React from 'react';
import Link from 'next/link';
import { Button } from '@moai/core';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { getHostName } from '../../utils/url';
import { excerpt, minimum as minimumStringLength } from '../../utils/string';
import { RoundedPanel } from '../RoundedPane';
import styles from './Entry.module.css';

const DEFAULT_AVATAR = 'kaonashi.jpg';

const EntryAuthor = ({ author }) => {
  const { name, avatar_url, url } = author;
  const hostName = getHostName(url);
  const blogUrl = `https://${hostName}`;
  const avatar = `/avatars/${avatar_url || DEFAULT_AVATAR}`;
  return (
    <div className={styles.entryAuthor}>
      <img className="avatar" src={avatar} />
      <div className="info">
        <b>{name}</b>
        <div>
          <Link href={blogUrl}>
            <a>{hostName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Entry = ({ doc }) => {
  return (
    <RoundedPanel>
      <EntryAuthor author={doc.author} />
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
