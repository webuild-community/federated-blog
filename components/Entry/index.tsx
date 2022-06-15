import { Author, Doc } from '@/types/sharedTypes';
import { formatDate } from '@/utils/date';
import { excerpt, minimum as minimumStringLength } from '@/utils/string';
import { encodePostUrl, getAvatarUrl, getHostName } from '@/utils/url';
import { Button } from '@moai/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineExternalLink as externalLink } from 'react-icons/hi';
import { RoundedPanel } from '../RoundedPane';
import styles from './Entry.module.css';

interface EntryAuthorProps {
  author: Author;
}
export const EntryAuthor = ({ author }: EntryAuthorProps) => {
  const { name, avatar_url, url } = author;
  const hostName = getHostName(url);
  const blogUrl = `https://${hostName}`;
  return (
    <div className={styles.entryAuthor}>
      <div className={styles.entryAvatar}>
        <Image
          alt={name}
          src={getAvatarUrl(avatar_url)}
          width={48}
          height={48}
        />
      </div>
      <div className="info">
        <Link href={`/author/${hostName}`}>
          <a>
            <b>{name}</b>
          </a>
        </Link>
        <div>
          <Link href={blogUrl}>
            <a>{hostName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export interface EntryProps {
  doc: Doc;
  showAuthor?: boolean;
}
export const Entry = ({ doc, showAuthor = true }: EntryProps) => {
  const encodedUrl = encodePostUrl(doc.link as string, doc.authorId);
  return (
    <RoundedPanel>
      {showAuthor && <EntryAuthor author={doc.author} />}
      <h3 className="entry-title mt-0">
        <Link href={`/read/${encodedUrl}`}>
          <a>{doc.title}</a>
        </Link>
      </h3>
      <p>Đăng ngày {formatDate(doc.pubDate as string)}</p>
      <p>{excerpt(minimumStringLength(doc.contentSnippet, 5), 50)}</p>
      <div className={styles.readMoreArea}>
        <Link href={`/read/${encodedUrl}`}>
          <a>
            <Button highlight>Đọc tiếp</Button>
          </a>
        </Link>
        <Button iconRight icon={externalLink} href={doc.link} target="_blank">
          Đọc trên blog của tác giả
        </Button>
      </div>
    </RoundedPanel>
  );
};
