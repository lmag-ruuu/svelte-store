import { pgTable,serial, varchar } from 'drizzle-orm/pg-core';
import { product } from './product.entity';
import { relations } from 'drizzle-orm';
import { orders } from './order.entity';

export const supplier = pgTable('Supplier', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  password: varchar('password').notNull(),
  user_type: varchar('user_type').notNull()
});

export const SupplierRelations = relations(supplier, ({  many }) => {
  return {
    products: many(product),
    orders: many(orders)
  }
});

export type InsertSupplier = typeof supplier.$inferInsert;
export type SelectSupplier = typeof supplier.$inferSelect;