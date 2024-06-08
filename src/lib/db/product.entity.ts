import { relations } from 'drizzle-orm';
import { pgTable, serial, numeric, varchar } from 'drizzle-orm/pg-core';
import { category } from './category.entity';

export const product = pgTable('Product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  price: numeric('price').notNull(),
  category_id: serial('category_id').notNull()
});

export const ProductRelations = relations(product, ({ one }) => {
  return {
    category: one(category, { fields: [product.category_id], references: [category.id] })
  }
})

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;