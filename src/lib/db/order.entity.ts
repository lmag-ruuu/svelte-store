import { pgTable, uuid, date, numeric } from 'drizzle-orm/pg-core';

export const orders = pgTable('Orders', {
  id: uuid('id').notNull().primaryKey(),
  customer_id: uuid('customer_id').notNull(),
  order_date: date('order_date').notNull(),
  total: numeric('total').notNull(),
})

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;