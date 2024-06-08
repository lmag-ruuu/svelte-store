import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const product_supplier = pgTable('ProductSupplier', {
  id: uuid('id').notNull().primaryKey(),
  product_id: uuid('product_id').notNull(),
  supplier_id: uuid('supplier_id').notNull(),
});

export type InsertProductSupplier = typeof product_supplier.$inferInsert;
export type SelectProductSupplier = typeof product_supplier.$inferSelect;