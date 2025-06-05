import { rabbitmq } from '../rabbitmq.ts'

export const orders = await rabbitmq.createChannel()

await orders.assertQueue('orders')