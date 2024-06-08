import type { InsertProduct } from "$lib/db/product.entity";
import { product } from "$lib/db/product.entity";
import { db } from "$lib/db";


export async function getProducts() {
  return await db.query.product.findMany();
};

export const createProduct = (data: InsertProduct) => {
  return db.insert(product).values(data).returning();
}; 