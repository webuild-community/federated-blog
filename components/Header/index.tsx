import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Logo from './logo';
import { Button } from '@moai/core';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const onToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <header>
      <div className="header-content">
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <Button
          onClick={onToggleTheme}
          icon={theme === 'light' ? HiOutlineMoon : HiOutlineSun}
          iconLabel={
            theme === 'light' ? 'Bật chế độ ban đêm' : 'Bật chế độ ban ngày'
          }
        />
      </div>
    </header>
  );
};

export default Header;
