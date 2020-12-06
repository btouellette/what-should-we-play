# What Should We Play

A simple app to allow friends to vote on different options for what to play. Built with a [React](reactjs.org/) + [Typescript](https://www.typescriptlang.org/) frontend, [Node](https://nodejs.org/en/) + Typescript + [Mongo](https://www.mongodb.com/) backend, and deployed on [Heroku](https://heroku.com)

Bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

Currently deployed at https://what-should-we-play.herokuapp.com

## Setup

Packages used in the backend and the frontend are managed separately via two separate package.json files using [yarn](https://yarnpkg.com/). Package installation needs to happen twice, once for each, before running

```
git clone git@github.com:btouellette/what-should-we-play.git
cd what-should-we-play
yarn install
cd react-ui
yarn install
```

## Development

### `yarn dev-client`

Run the React UI in development mode. Will open http://localhost:3000 in your browser with hot reload enabled

### `yarn dev-server`

Run the Node backend in development mode using [nodemon](https://nodemon.io/) to watch for updates to Typescript files for hot reload

### `yarn dev`

Uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) to run both dev-client and dev-server simultaneously via [`./bootstrap.ts`](bootstrap.ts) which is set up to cleanly exit both processes when killed

### `yarn build`

Builds both Node backend and React UI frontend for deployment or testing against production version

### `yarn start`

Starts Node server from production build. `yarn build` must be run first

### `yarn test`

Run front-end tests on the React UI configured in *.test.tsx files

## Deploying

The backend package.json is set up with a Heroku postbuild script to automatically build both the front and backend after pushing the repo to Heroku
