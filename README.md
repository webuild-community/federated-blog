<h1 align="center">
  <img src="./public/weblog.svg" height="36" alt="WeBlog" title="WeBlog" />
  <br />
  Federated Blog
</h1>
<p align="center">
<a href="https://github.com/webuild-community/federated-blog"><img src="https://github.com/webuild-community/federated-blog/actions/workflows/test.yaml/badge.svg?branch=main" /></a>
<a href="https://github.com/webuild-community/federated-blog"><img src="https://github.com/webuild-community/federated-blog/actions/workflows/lint.yaml/badge.svg?branch=main" /></a>
<a href="https://webuild.community"><img src="https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg" /></a>
</p>

A federated blogging platform built for WeBuild Community. Federated blog is a
network of interconnected blogs or websites, which called the [Fediverse].

It was built for the Webuild community but please feel free to use it for your
own community.

[fediverse]: https://en.wikipedia.org/wiki/Fediverse

## Install

Please make sure you have `node` and `yarn` (or `npm`) installed on your
machine.

To run federated blog locally or on your own server:

1. Clone this repo

```sh
git clone https://github.com/webuild-community/federated-blog.git
```

3. Within your terminal, run `yarn` to install the dependencies
4. Once the dependencies are installed, run `yarn dev` to start the dev server
   on `localhost:3000`

Don't forget to check out the `channels.json`, where RSS feeds storage.

To run in production:

1. Builds the production application into the `.next` folder:

```sh
yarn build
```

2. Start Node.js server:

```sh
yarn start
```

To run test:

```sh
yarn test
```

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md).

We have a list of [good first issues] that contain bugs or features which have a
relatively limited scope. This is a great place to get started and get familiar
with our contribution process.

[good first issues]:
  https://github.com/webuild-community/federated-blog/labels/good%20first%20issue
