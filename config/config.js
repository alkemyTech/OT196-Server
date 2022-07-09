require("dotenv").config();
const env = process.env.NODE_ENV;

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  secretToken: process.env.DB_TOKEN,
  dialect: "mysql",
};
const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST,
  secretToken: process.env.DB_TOKEN,
  dialect: "mysql",
};
const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  secretToken: process.env.DB_TOKEN,
  dialect: "mysql",
};

const config = {
  development,
  test,
  production,
};

module.exports = config[env];
