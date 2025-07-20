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

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(multipart)

app.get('/health', () => {
  return 'OK';
});

app.register(getLaptops);
app.register(postLaptop);
app.register(getSellers);
app.register(postUploadImage);

app.listen({ port: env.API_PORT })