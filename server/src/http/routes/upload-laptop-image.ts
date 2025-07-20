import { pipeline } from "node:stream/promises";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import fs from 'fs';
import path from "node:path";
import z from "zod";
import { db } from "../../db/connection.ts";
import { eq } from "drizzle-orm";
import { schema } from "../../db/schema/index.ts"

export const postUploadImage: FastifyPluginCallbackZod = (app) => {
	app.post("/laptops/upload/:laptopId", {
		schema: {
			params: z.object({
				laptopId: z.string(),
			})
		}
	}, async (request, reply) => {
		const { laptopId } = request.params;
		const data = await request.file();
		const uploadPath = './uploads/';

		if (data) {
			const unique_filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(data.filename);

			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath, { recursive: true });
			}

			await pipeline(data.file, fs.createWriteStream(uploadPath + unique_filename))

			await db.update(schema.laptop).set({ img: unique_filename }).where(eq(schema.laptop.id, laptopId))

			return reply.status(201).send({ "filename": unique_filename })
		}
		return reply.send()
	});
};
