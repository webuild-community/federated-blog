import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import '@moai/core/dist/bundle.css';
import '@moai/core/dist/font/remote.css';
import '../styles/globals.css';
import '../theme/theme.css';
import '../theme/theme';

const progress = new ProgressBar({
  size: 2,
  color: '#38a169',
  className: 'bar-of-progress',
  delay: 10
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <div className="header-content">
          <img src="/weblog.svg" />
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
