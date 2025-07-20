import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';
import { env } from './env.ts';
import { getLaptops } from './http/routes/get-laptops.ts';
import { postLaptop } from './http/routes/create-laptop.ts';
import { getSellers } from './http/routes/get-sellers.ts';
import { postUploadImage } from './http/routes/upload-laptop-image.ts';
import multipart from '@fastify/multipart'
import fastify_static from '@fastify/static';
import path from 'node:path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(multipart);

app.get('/health', () => {
  return 'OK';
});

app.register(getLaptops);
app.register(postLaptop);
app.register(getSellers);
app.register(postUploadImage);

app.register(fastify_static, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/'
})

app.listen({ port: env.API_PORT })