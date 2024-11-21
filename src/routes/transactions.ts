import { FastifyInstance } from "fastify";
import { z } from "zod";

import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExist } from "../middlewares/check-session-id-exist";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select();

      return {
        transactions,
      };
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
        // type: z.enum(["credit", "debit"]),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await knex("transactions")
        .where({
          id,
          session_id: sessionId,
        })
        .first();

      return {
        transaction,
      };
    }
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first();
      return { summary };
    }
  );

  app.post("/", async (request, reply) => {
    const createdTransactionBodySchema = z.object({
      title: z.string().min(1).max(255),
      amount: z.number().min(0.01).max(100000),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createdTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send("Record created successfully!");
  });

  app.delete(
    "/",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      await knex("transactions").where("session_id", sessionId).del();

      return "All records deleted successfully!";
    }
  );
}
