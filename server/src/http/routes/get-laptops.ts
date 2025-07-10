import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq, and, sql } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

export const getLaptops: FastifyPluginCallbackZod = (app) => {
  app.get("/laptops", async () => {
    const subquery = db
      .select({
        fkLaptop: schema.check.fk_laptop,
        lastCheckAt: sql`MAX(${schema.check.check_at})`.as("lastCheckAt"),
      })
      .from(schema.check)
      .groupBy(schema.check.fk_laptop)
      .as("latest_check");

    const result = await db
      .select({
        id: schema.laptop.id,
        link: schema.laptop.link,
        model: schema.laptop.model,
        processor: schema.laptop.processor,
        ram: schema.laptop.ram,
        price: schema.check.price,
        checkedAt: schema.check.check_at,
      })
      .from(schema.laptop)
      .innerJoin(
        subquery,
        eq(schema.laptop.id, subquery.fkLaptop)
      )
      .innerJoin(
        schema.check,
        and(
          eq(schema.check.fk_laptop, subquery.fkLaptop),
          eq(schema.check.check_at, subquery.lastCheckAt)
        )
      );

    return result;
  });
};
