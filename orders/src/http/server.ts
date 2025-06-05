import '@opentelemetry/auto-instrumentations-node/register';

import fastifyCors from '@fastify/cors';
import { trace } from '@opentelemetry/api';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { dispatchOrderCreated } from '../rabbitmq/messages/order-created.ts';
import { db } from '../storage/client.ts';
import { schema } from '../storage/schemas/schema.ts';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.register(fastifyCors, { origin: '*' })

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get("/health", async (request, response) => {
  return { message: "Hello from Orders Service!" };
})

const createOrderSchema = {
  schema: {
    body: z.object({
      amount: z.coerce.number()
    })
  }
}

server.post("/orders", createOrderSchema, async (request, response) => {
  const { amount } = request.body;

  const orderId = crypto.randomUUID()
  const customerId = '0f69c534-99eb-41f2-abf7-3f40395fcf31'

  await db.insert(schema.order).values({
    id: orderId,
    customerId: customerId,
    amount,
  })

  trace.getActiveSpan()?.setAttribute('order_id', orderId)

  dispatchOrderCreated({
    orderId,
    amount,
    customer: {
      id: customerId
    },
  })

  return response.status(201).send()
})


server.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log("[ORDERS] HTTP server listening");
})