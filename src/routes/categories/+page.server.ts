import { getCategories } from "$lib/services/categories";

export const load = async () => {
  const res = await getCategories({ populate: true });
  return {
    categories: res
  };
}