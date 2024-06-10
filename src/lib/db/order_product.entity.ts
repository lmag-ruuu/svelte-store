import { relations } from 'drizzle-orm';
import { pgTable, serial } from 'drizzle-orm/pg-core';
import { product } from './product.entity';
import { orders } from './order.entity';

export const OrderProduct = pgTable('Order_Product', {
  id: serial('id').primaryKey(),
  order_id: serial('order_id').notNull(),
  product_id: serial('product_id').notNull(),
});

export const OrderProductRelations = relations(OrderProduct, ({ one }) => {
  return {
    product: one(product, { fields: [OrderProduct.product_id], references: [product.id] }),
    order: one(orders, { fields: [OrderProduct.order_id], references: [orders.id] })
  }
});

export type InsertOrderProduct = typeof OrderProduct.$inferInsert;
export type SelectOrderProduct = typeof OrderProduct.$inferSelect;
