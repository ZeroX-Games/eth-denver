# ZeroX Arcade Frontend

Please setup your backend or use our backend server before setting up the frontend.

## Setup npm/node
Use the consistent version of npm/node(^18.7.1) by running:
```sh
nvm use
```

## Installation

Install the application dependencies by running:

```sh
npm install
```

## Setup environment variables

Duplicate the .env.example file and rename it to .env, then fill in the required environment variables.
Please check your backend setup script output for the `VITE_BASE_DOMAINID`, `VITE_ARBI_DOMAINID`, and `VITE_LINEA_DOMAINID` values.


### Development

Follow the instructions in the [backend](../backend/README.md) to start the backend server.

Start the application in development mode by running:

```sh
npm run dev
```

## Production

### Build production

Build the application in production mode by running:

```sh
npm run build
```

Or build with turbo:

```sh
npm run turbo:build
```

### Deploy
Our [deployment](https://zeroxarcade.netlify.app/) is done using [Netlify](https://www.netlify.com/). You can deploy the application by cloning the repo and setting up Netlify.
