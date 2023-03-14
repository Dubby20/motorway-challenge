/* eslint-disable no-var */
require("dotenv").config();

// required environment variables
[
  "NODE_ENV",
  "PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});


module.exports = {
  env: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  db: {
    test: {
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST,
      host: process.env.DB_HOST_TEST,
    },
    dev: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST
    },
    production: {
      username: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD,
      host: process.env.DB_HOST_PROD,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};
