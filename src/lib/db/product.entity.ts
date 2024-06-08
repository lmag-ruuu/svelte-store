import { pgTable, uuid, numeric, varchar } from 'drizzle-orm/pg-core';

export const product = pgTable('Product', {
  id: uuid('id').notNull().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  price: numeric('price').notNull(),
  category_id: uuid('category_id').notNull()
});

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;