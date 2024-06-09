import type { InsertProduct } from "$lib/db/product.entity";
import { product } from "$lib/db/product.entity";
import { db } from "$lib/db";
import { type IProductSearchParams } from "./query";
import { and, eq, ilike, like, or } from "drizzle-orm";

const getQueries = (params?: IProductSearchParams) => {
  const keys = Object.keys(params || {});

  const queries = keys.map((key) => {
    const value = params?.[key as keyof IProductSearchParams];
    if (key === 'keyword' && value !== undefined) {
      return ilike(product.name, `%${value}%`);
    }
    if (key === 'category' && value !== undefined) {
      return eq(product.category_id, value as number);
    }
    return null;
  }).filter((query) => query !== null);

  return queries
}

export async function getProducts(params?: IProductSearchParams) {
  if (!params) {
    return (await db.query.product.findMany()).reverse();
  }
  return await db.select().from(product).where(and(...getQueries(params)));
};

export const createProduct = (data: InsertProduct) => {
  return db.insert(product).values(data).returning();
}; 