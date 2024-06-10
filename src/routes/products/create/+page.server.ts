import { type Actions, error, redirect } from "@sveltejs/kit";
import { type InsertCategory } from "$lib/db/category.entity";
import { createCategory, getCategories } from "$lib/services/categories";
import type { InsertProduct } from "$lib/db/product.entity";
import { createProduct } from "$lib/services/products";
import type { IBaseLocals } from "$lib/services/session/sessionManager";

export const actions: Actions = {
  "add-product": async ({ request, locals: _ilocals }) => {
    const locals = _ilocals as IBaseLocals;
    const body = await request.formData();
    const description = body.get('description')?.toString();
    const name = body.get('name')?.toString();
    const price = body.get('price')?.toString();
    const category = body.get('category')?.toString();
    const image_url = body.get('image_url')?.toString();
    const supplier_id = locals.user?.id;
    if (!name || !price || !category) {
      return error(400, { message: 'Name, description, price and category are required' });
    }
    try {
      const productPayload: InsertProduct = {
        name,
        description,
        price,
        category_id: +category,
        image_url,
        supplier_id
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


export const load = async ({ locals }: { locals: IBaseLocals }) => {
  const res = await getCategories();

  if(!locals.isUserLoggedIn || locals?.user?.user_type !== 'supplier') {
    redirect(302, '/')
  }

  return {
    categories: res
  };
}