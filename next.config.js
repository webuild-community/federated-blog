const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/1',
        permanent: true
      }
    ];
  }
});
