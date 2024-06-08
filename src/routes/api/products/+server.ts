import { getProducts } from "$lib/services/products";

export const GET = async () => {
  try {
    const res = await getProducts();
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};