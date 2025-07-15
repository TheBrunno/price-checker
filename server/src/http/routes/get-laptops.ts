import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq, and, sql } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

export const getLaptops: FastifyPluginCallbackZod = (app) => {
	app.get("/laptops", async () => {
		/*
		  select lap.id, model, processor, ram, img, expected_price, ck.check_at, price from laptop lap
		  inner join (select fk_laptop, max(check_at) as lastCheckAt from `check` group by fk_laptop) as sub on sub.fk_laptop = lap.id
		  inner join `check` ck on ck.fk_laptop = lap.id and ck.check_at = sub.lastCheckAt;
		*/
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
				img: schema.laptop.img,
				model: schema.laptop.model,
				processor: schema.laptop.processor,
				ram: schema.laptop.ram,
				price: schema.check.price,
				expectedValue: schema.laptop.expected_price,
				checkedAt: schema.check.check_at,
			})
			.from(schema.laptop)
			.leftJoin(
				subquery,
				eq(schema.laptop.id, subquery.fkLaptop)
			)
			.leftJoin(
				schema.check,
				and(
					eq(schema.check.fk_laptop, subquery.fkLaptop),
					eq(schema.check.check_at, subquery.lastCheckAt)
				)
			);

		return result;
	});
};
