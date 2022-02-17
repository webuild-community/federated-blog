import { Button } from '@moai/core';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import styles from './Header.module.css';
import Logo from './logo';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const onToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <div className={styles.headerNav}>
          <Link href="/page/random" passHref>
            <Button>Đọc ngẫu nhiên</Button>
          </Link>

          <Link href="/author" passHref>
            <Button>Về chúng tôi</Button>
          </Link>

          <Button
            onClick={onToggleTheme}
            icon={theme === 'light' ? HiOutlineMoon : HiOutlineSun}
            iconLabel={
              theme === 'light' ? 'Bật chế độ ban đêm' : 'Bật chế độ ban ngày'
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
