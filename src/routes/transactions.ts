import { FastifyInstance } from "fastify";
import { z } from "zod";

import { randomUUID } from "node:crypto";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select();
    return {
      transactions,
    };
  });

  app.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
      // type: z.enum(["credit", "debit"]),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);
    const transaction = await knex("transactions").where("id", id).first();

    return {
      transaction,
    };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first();
    return { summary };
  });

  app.post("/", async (request, reply) => {
    const createdTransactionBodySchema = z.object({
      title: z.string().min(1).max(255),
      amount: z.number().min(0.01).max(100000),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createdTransactionBodySchema.parse(
      request.body
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send("Record created successfully!");
  });

  app.delete("/", async () => {});
}
