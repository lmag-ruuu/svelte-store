import { type IBaseLocals } from './../../lib/services/session/sessionManager';
import { getCategories } from "$lib/services/categories";
import { getProducts } from "$lib/services/products";
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: { locals: IBaseLocals }) => {
  const products = await getProducts();
  const categories = await getCategories();
  if (!locals.isUserLoggedIn) {
    redirect(302, '/auth/sign-in')
  }
  return {
    products,
    categories,
    session: locals
  };
}