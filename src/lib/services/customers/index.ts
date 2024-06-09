import { db } from "$lib/db";
import { customers, type InsertCustomer } from "$lib/db/customer.entity";

export const createCustomer = (data: InsertCustomer) => {
  return db.insert(customers).values(data).returning();
}; 