import { pgTable,serial, text, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('Customer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  user_type: varchar('user_type').notNull()
});

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
