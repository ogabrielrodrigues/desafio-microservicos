import ampq from 'amqplib'

if (process.env.RABBITMQ_URL === undefined) {
  throw new Error('RABBITMQ_URL environment variable is not set')
}

export const rabbitmq = await ampq.connect(process.env.RABBITMQ_URL)
