import { pgTable, serial, numeric } from 'drizzle-orm/pg-core';

export const OrderProduct = pgTable('Order_Product', {
  id: serial('id').primaryKey(),
  order_id: serial('order_id').notNull(),
  product_id: serial('product_id').notNull(),
  quantity: numeric('quantity').notNull()
});

export type InsertOrderProduct = typeof OrderProduct.$inferInsert;
export type SelectOrderProduct = typeof OrderProduct.$inferSelect;
