import { getCategories } from "$lib/services/categories";

export const GET = async () => {
  try {
    const res = await getCategories();
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};