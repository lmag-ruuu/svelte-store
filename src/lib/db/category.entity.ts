import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const category = pgTable('Category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;
