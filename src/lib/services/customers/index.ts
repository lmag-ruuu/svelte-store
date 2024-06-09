import { db } from "$lib/db";
import { customers, type InsertCustomer } from "$lib/db/customer.entity";
import { eq } from "drizzle-orm";

export const createCustomer = (data: InsertCustomer) => {
  return db.insert(customers).values(data).returning();
};

export const getCustomerByEmail = (email: string) => {
  return db.query.customers.findFirst({ where: eq(customers.email, email) });
}