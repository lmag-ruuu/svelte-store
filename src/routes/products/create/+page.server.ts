import { type Actions, error } from "@sveltejs/kit";
import { type InsertCategory } from "$lib/db/category.entity";
import { createCategory, getCategories } from "$lib/services/categories";
import type { InsertProduct } from "$lib/db/product.entity";
import { createProduct } from "$lib/services/products";

export const actions: Actions = {
  "add-product": async ({ request }) => {
    const body = await request.formData();
    const description = body.get('description')?.toString();
    const name = body.get('name')?.toString();
    const price = body.get('price')?.toString();
    const category = body.get('category')?.toString();
    if (!name || !price || !category) {
      return error(400, { message: 'Name, description, price and category are required' });
    }
    try {
      const productPayload: InsertProduct = {
        name,
        description,
        price,
        category_id: +category
      };
      const res = createProduct(productPayload);
      return res;
    } catch (_e) {
      const e = _e as Error;
      return error(400, { message: e.message });
    }
  },
  "add-category": async ({ request }) => {
    const body = await request.formData();
    const name = body.get('name')?.toString();
    const description = body.get('description')?.toString();
    if (!name) {
      return error(400, { message: 'Name is required' });
    }
    try {
      const categoryPayload: InsertCategory = {
        name: name,
        description: description
      };
      const res = createCategory(categoryPayload);
      return res;
    } catch (_e) {
      const e = _e as Error;
      return error(400, { message: e.message });
    }
  }
}

export const load = async () => {
  const res = await getCategories();
  return {
    categories: res
  };
}