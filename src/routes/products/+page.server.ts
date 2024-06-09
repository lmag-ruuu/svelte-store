import { getCategories } from "$lib/services/categories";
import { getProducts } from "$lib/services/products";

export const load = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    products,
    categories
  };
}