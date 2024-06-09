import { relations } from 'drizzle-orm';
import { pgTable, serial, text, } from 'drizzle-orm/pg-core';
import { product, type SelectProduct } from './product.entity';

export const category = pgTable('Category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description')
});

export const CategoryRelations = relations(category, ({ many }) => {
  return {
    products: many(product)
  };
})

export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;
export type SelectCategoryWithProducts = SelectCategory & {
  products: SelectProduct[];
};
