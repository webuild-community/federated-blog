import { ThemeProvider } from 'next-themes';
import '@moai/core/dist/bundle.css';
import '@moai/core/dist/font/remote.css';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../theme/theme.css';
import '../theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="theme"
        themes={['light', 'dark']}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
