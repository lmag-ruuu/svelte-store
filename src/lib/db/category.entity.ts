import { relations } from 'drizzle-orm';
import { pgTable,serial, text, } from 'drizzle-orm/pg-core';
import { product } from './product.entity';

export const category = pgTable('Category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export const CategoryRelations = relations(category, ({ many }) => {
  return {
    product: many(product)
  };
})

export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;
