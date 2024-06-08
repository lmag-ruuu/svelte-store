import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const supplier = pgTable('Supplier', {
  id: uuid('id').notNull().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
});

export type InsertSupplier = typeof supplier.$inferInsert;
export type SelectSupplier = typeof supplier.$inferSelect;