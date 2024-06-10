import { relations } from 'drizzle-orm';
import { pgTable, serial, numeric, varchar } from 'drizzle-orm/pg-core';
import { category } from './category.entity';
import { supplier } from './supplier.entity';
import { OrderProduct } from './order_product.entity';

export const product = pgTable('Product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  price: numeric('price').notNull(),
  category_id: serial('category_id').notNull(),
  image_url: varchar('image_url'),
  supplier_id: serial('supplier_id')
});

export const ProductRelations = relations(product, ({ one, many }) => {
  return {
    category: one(category, { fields: [product.category_id], references: [category.id] }),
    supplier: one(supplier, { fields: [product.supplier_id], references: [supplier.id] }),
    orders_to_products: many(OrderProduct)
  }
});

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;