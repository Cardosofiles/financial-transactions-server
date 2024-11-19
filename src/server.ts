import fastify from "fastify";

import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/hello", async (req, res) => {
  const transactions = await knex("transactions")
    .where("amount", 100)
    .select("*");

  return transactions;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server is running on port 3333");
  });

// .insert({
//   id: crypto.randomUUID(),
//   title: "Test Transaction",
//   amount: 100.0,
// })
// .returning("*");
