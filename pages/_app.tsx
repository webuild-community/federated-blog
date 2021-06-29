import Image from 'next/image';
import '@moai/core/dist/bundle.css';
import '@moai/core/dist/font/remote.css';
import '@/styles/globals.css';
import '@/theme/theme.css';
import '@/theme/theme';
import Link from 'next/link';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <div className="header-content">
          <Link href="/" passHref>
            <a>
              <Image
                src="/weblog.svg"
                alt="Webuild Blog Logo"
                width="152"
                height="36"
              />
            </a>
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
