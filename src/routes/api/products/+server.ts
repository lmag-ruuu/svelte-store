import { getProducts } from "$lib/services/products";

export const GET = async ({ url }) => {
  const params = new URLSearchParams(url.search);
  const keyword = params.get('keyword');
  const category = params.get('category');
  try {
    const res = await getProducts({
      keyword: keyword ? keyword : undefined,
      category: category ? +category : undefined
    });
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};