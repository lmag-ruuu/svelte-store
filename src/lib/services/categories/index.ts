import { db } from "$lib/db";
import { category, type InsertCategory } from "$lib/db/category.entity";

interface ICategorySearchParams {
  populate?: boolean;
}

export async function getCategories(params?: ICategorySearchParams) {
  return await db.query.category.findMany(params?.populate ? {
    with: {
      products: true
    }
  } : undefined);
};

export async function createCategory(data: InsertCategory) {
  return await db.insert(category).values(data).returning();
}