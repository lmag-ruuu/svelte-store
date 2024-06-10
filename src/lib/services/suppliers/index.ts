import { db } from "$lib/db";
import { supplier, type InsertSupplier } from "$lib/db/supplier.entity";
import { eq } from "drizzle-orm";

export const createSupplier = (data: InsertSupplier) => {
  return db.insert(supplier).values(data).returning();
};

export const getAllSuppliers = () => {
  return db.query.supplier.findMany();
};

export const getSupplierByEmail = (email: string) => {
  return db.query.supplier.findFirst({ where: eq(supplier.email, email) });
}