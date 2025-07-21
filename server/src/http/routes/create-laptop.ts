import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from 'zod';

export const postLaptop: FastifyPluginCallbackZod = (app) => {
	app.post("/laptops", {
		schema: {
			body: z.object({
				model: z.string({
					message: "Insira um modelo válido"
				}).min(2, {
					message: "Modelo precisa conter no mínimo 2 caracteres."
				}),

				processor: z.string({
					message: "Insira um processador válido"
				}),

				ram: z.coerce.number({
					message: "Insira um valor válido"
				}).int({
					message: "Insira um número válido"
				}),

				expected_value: z.coerce.number({
					message: "Insira um valor válido"
				}).int({
					message: "Insira um valor válido"
				}),

				image: z.file().mime(['image/png', 'image/jpeg', 'image/webp'], {
					message: "Insira apenas PNG, JPEG, WEBP"
				}).optional(),

				sellers: z.array(z.object({
					id: z.number(),
					name: z.string(),
					url: z.string().optional()
				}))
			})
		}
	}, async (request, reply) => {
		const { model, processor, ram, expected_value, sellers } = request.body;

		const result = await db.insert(schema.laptop).values({
			model, 
			processor, 
			ram, 
			expected_price: expected_value
		}).$returningId();

		const insertedLaptopID = result[0];

		if(!insertedLaptopID){
			throw new Error('Falhou em criar um novo notebook');
		}else{
			for (const seller of sellers) {
				if (seller.url) {
					await db.insert(schema.laptop_seller).values({
						fk_laptop: insertedLaptopID.id,
						fk_seller: seller.id,
						link: seller.url
					});
				}
			}

			return reply.status(201).send({ laptopId: insertedLaptopID.id })
		}
	});
};
