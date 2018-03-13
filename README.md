# wear-shop-app
E-shop app written on React and inspired by Google Polymer's demo project. Design and behavior are reverse-engineered from [the original](https://shop.polymer-project.org/).

## Features

- Items list page by categories
- Item details page
- Cart management
- Checkout process
- e2e tests (up to checkout page)

## Tech Stack

- ES2015, Babel
- Webpack
- React 15.x
- Redux
- React Router
- Node 8.x
- Express 4.x
- Linting: ESLint
- E2E tests: WebDriverJS

## Installation and Usage
Install all dependencies:
```
npm i
```

Build assets with webpack:
```
npm run build:prod
```

App now is ready to start:
```
npm start
```

## Releases

- v1 - uses react component's state feature to manage its state.
- v2 - uses redux to manage its state.
