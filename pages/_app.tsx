import { ThemeProvider } from 'next-themes';
import '@moai/core/dist/bundle.css';
import '@moai/core/dist/font/remote.css';
import { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';
import '@/styles/globals.css';
import '@/theme/theme.css';
import '@/theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PlausibleProvider domain="read.webuild.community">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storageKey="theme"
          themes={['light', 'dark']}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
