import type { InsertProduct } from "$lib/db/product.entity";
import { product } from "$lib/db/product.entity";
import { db } from "$lib/db";

export const createProduct = (data: InsertProduct) => {
  return db.insert(product).values(data).returning();
}; 