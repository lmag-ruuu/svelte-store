import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { orders } from './order.entity';

export const customers = pgTable('Customer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  user_type: varchar('user_type').notNull()
});

export const CustomerRelations = relations(customers, ({ one }) => {
  return {
    order: one(orders, { fields: [customers.id], references: [orders.customer_id] })
  }
});

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
