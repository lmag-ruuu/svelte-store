import { getCategories } from "$lib/services/categories";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  const params = new URLSearchParams(url.search);
  const populate = params.get('populate') === 'true';
  try {
    const res = await getCategories({ populate });
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};