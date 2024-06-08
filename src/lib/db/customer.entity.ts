import { pgTable,serial, text } from 'drizzle-orm/pg-core';

export const customers = pgTable('Customer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
});

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
