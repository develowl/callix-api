<h1 style="font-size: 40px; text-align: center;">Launches - Callix API</h1>

## Getting Started

### Prerequisites

- Node.js installed
- Npm or yarn installed

#### 1. First, install the dependencies:

```bash
npm install
# or
yarn install
```

#### 2. Set environments properly in an `.env` file:

```sh
# .env.example
PORT=3333
SPACEX_API=https://api.spacexdata.com/v5/launches/query
```

#### 3. Then, run the development server:

```bash
npm run start:dev
# or
yarn start:dev
```

#### 4. And finally:

Open [http://localhost:3333/docs](http://localhost:3333/docs) with your browser to see the API documentation.

## Implementation

This project was created using the [NestJS](https://docs.nestjs.com/) framework for building efficient, scalable Node.js web applications. For documentation, the [Swagger](https://docs.nestjs.com/openapi/introduction) was used. [Jest](https://jestjs.io/docs/getting-started) was used for carry out tests, [Husky](https://typicode.github.io/husky/) was used to guarantee the integrity of all commits. Finally, a [CI/CD pipeline](https://github.com/develowl/callix-api/actions) was created using a yaml configuration file, with GitHub workflow managing that process, and the deployment was made with [Docker](https://docker.com) and to top it off, the application was hosted in [Heroku](https://heroku.com), so it can be found at this address [Callix API - Launches](https://callix-api-799d885cf5e5.herokuapp.com/docs).

## Routes

All routes are documented with swagger in `/docs` route.

## License

This project is licensed under the MIT license - see the LICENSE file for details.