import { relations } from 'drizzle-orm';
import { pgTable, serial, date, numeric, text } from 'drizzle-orm/pg-core';
import { customers } from './customer.entity';
import { supplier } from './supplier.entity';
import { product } from './product.entity';
import { OrderProduct } from './order_product.entity';

export const orders = pgTable('Orders', {
  id: serial('id').primaryKey(),
  customer_id: serial('customer_id').notNull(),
  supplier_id: serial('supplier_id').notNull(),
  order_date: date('order_date').notNull(),
  total: numeric('total').notNull(),
  postal_code: text('postal_code').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  state: text('state').notNull(),
  status: text('status').notNull().default('pending'),
});

export const OrderRelations = relations(orders, ({ one, many }) => {
  return {
    customer: one(customers, { fields: [orders.customer_id], references: [customers.id] }),
    supplier: one(supplier, { fields: [orders.customer_id], references: [supplier.id] }),
    products_in_order: many(OrderProduct)
  }
});

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;