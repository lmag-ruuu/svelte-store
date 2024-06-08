import { db } from "$lib/db";
import { category, type InsertCategory } from "$lib/db/category.entity";

export async function getCategories() {
  return await db.query.category.findMany();
};

export async function createCategory(data: InsertCategory) {
  return await db.insert(category).values(data).returning();
}