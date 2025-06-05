import '@opentelemetry/auto-instrumentations-node/register';
import '../rabbitmq/subscriber.ts';

import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.register(fastifyCors, { origin: '*' })

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get("/health", async (request, response) => {
  return { message: "Hello from Invoices Service!" };
})

server.listen({ host: '0.0.0.0', port: 3334 }).then(() => {
  console.log("[INVOICES] HTTP server listening");
})