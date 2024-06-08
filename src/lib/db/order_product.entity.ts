import { pgTable, uuid, numeric } from 'drizzle-orm/pg-core';

export const OrderProduct = pgTable('Order_Product', {
  id: uuid('id').primaryKey(),
  order_id: uuid('order_id').notNull(),
  product_id: uuid('product_id').notNull(),
  quantity: numeric('quantity').notNull()
});

export type InsertOrderProduct = typeof OrderProduct.$inferInsert;
export type SelectOrderProduct = typeof OrderProduct.$inferSelect;
