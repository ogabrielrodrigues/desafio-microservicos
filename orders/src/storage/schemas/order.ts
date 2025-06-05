import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customer } from "./customer.ts";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "canceled",
])

export const order = pgTable('order', {
  id: text().primaryKey(),
  customerId: text().notNull().references(() => customer.id),
  amount: integer().notNull(),
  status: orderStatusEnum().notNull().default('pending'),
  createdAt: timestamp().notNull().defaultNow(),
})