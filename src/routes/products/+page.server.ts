import { getProducts } from "$lib/services/products";

export const load = async () => {
  const res = await getProducts();
  return {
    products: res
  };
}