import "dotenv/config";

import { Knex, knex as knexConfig } from "knex";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = knexConfig(config);
