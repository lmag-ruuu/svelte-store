import type { InsertCategory } from "$lib/db/category.entity.js";
import { createCategory, getCategories } from "$lib/services/categories";
import { error } from "@sveltejs/kit";

export const load = async () => {
  const res = await getCategories({ populate: true });
  return {
    categories: res
  };
}

export const actions = {
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