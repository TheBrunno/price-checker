import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

export const getSellers: FastifyPluginCallbackZod = (app) => {
	app.get("/sellers", async () => {

		const result = await db
			.select({
				id: schema.seller.id,
				name: schema.seller.seller
			})
			.from(schema.seller);

		return result;
	});
};
