import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"

export const getLaptops: FastifyPluginCallbackZod = (app) => {
    app.get('/laptops', async () => {
        const result = await db
            .select({
                id: schema.laptop.id,
                link: schema.laptop.link,
                model: schema.laptop.model,
                processor: schema.laptop.processor,
                ram: schema.laptop.ram
            })
            .from(schema.laptop);
        
            return result;
        })
}