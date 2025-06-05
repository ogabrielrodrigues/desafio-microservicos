import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const invoice = pgTable('invoice', {
  id: text().primaryKey(),
  orderId: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})