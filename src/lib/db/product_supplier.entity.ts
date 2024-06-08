import { pgTable, serial } from 'drizzle-orm/pg-core';

export const product_supplier = pgTable('ProductSupplier', {
 id: serial('id').primaryKey(),
  product_id: serial('product_id').notNull(),
  supplier_id: serial('supplier_id').notNull(),
});

export type InsertProductSupplier = typeof product_supplier.$inferInsert;
export type SelectProductSupplier = typeof product_supplier.$inferSelect;