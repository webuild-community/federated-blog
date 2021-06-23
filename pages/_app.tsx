import '../styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';

const progress = new ProgressBar({
  size: 2,
  color: '#38a169',
  className: 'bar-of-progress',
  delay: 10
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return <>
    <header>
      <img src="/webuild.svg" />
    </header>
    <Component {...pageProps} />
  </>
}

export default MyApp
