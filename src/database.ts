import { knex as knexConfig } from "knex";

export const knex = knexConfig({
  client: "sqlite",
  connection: {
    filename: "./tmp/app.db",
  },
});
