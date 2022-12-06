require("dotenv").config();
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const node_env = process.env.NODE_ENV;

const config = {
  dev: {
    db: {
      host,
      database,
      username,
      password,
    },
  },
  test: {},
  prod: {},
};
module.exports = config[node_env];
