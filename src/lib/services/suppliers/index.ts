import { db } from "$lib/db";
import { supplier, type InsertSupplier } from "$lib/db/supplier.entity";

export const createSupplier = (data: InsertSupplier) => {
  return db.insert(supplier).values(data).returning();
}; 