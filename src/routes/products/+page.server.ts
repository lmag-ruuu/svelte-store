import { type IBaseLocals } from './../../lib/services/session/sessionManager';
import { getCategories } from "$lib/services/categories";
import { getProducts } from "$lib/services/products";

export const load = async ({ locals }: { locals: IBaseLocals }) => {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    products,
    categories,
    session: locals
  };
}