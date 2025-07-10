import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: '../.env' });

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().startsWith('mysql://'),
});

export const env = envSchema.parse(process.env);
