import { pgTable,serial, date, numeric } from 'drizzle-orm/pg-core';

export const orders = pgTable('Orders', {
 id: serial('id').primaryKey(),
  customer_id: serial('customer_id').notNull(),
  order_date: date('order_date').notNull(),
  total: numeric('total').notNull(),
})

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;