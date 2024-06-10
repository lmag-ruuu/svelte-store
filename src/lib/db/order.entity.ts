import { pgTable, serial, date, numeric, text } from 'drizzle-orm/pg-core';

export const orders = pgTable('Orders', {
  id: serial('id').primaryKey(),
  customer_id: serial('customer_id').notNull(),
  order_date: date('order_date').notNull(),
  total: numeric('total').notNull(),
  postal_code: text('postal_code').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  state: text('state').notNull(),
  status: text('status').notNull().default('pending'),
})

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;