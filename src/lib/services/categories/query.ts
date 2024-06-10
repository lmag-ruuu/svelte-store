import { createQuery } from "@tanstack/svelte-query";
import type { SelectCategory, SelectCategoryWithProducts } from "$lib/db/category.entity";
import axios from "axios";

interface IParams {
  populate?: boolean;
}

const getAllCategoriesQueryKey = (params?: IParams) => {
  return [
    "categories",
    params,
  ];
};

export const getAllCategoriesQuery = (initialData?: SelectCategory[], params?: IParams) => createQuery({
  queryKey: getAllCategoriesQueryKey(),
  queryFn: async () => {
    const data = await axios.get<SelectCategory[]>("/api/categories");
    return data.data;
  },
  initialData: initialData as SelectCategory[],
});

export const getAllCategoriesQueryWProducts = (initialData?: SelectCategoryWithProducts[], params?: IParams) => createQuery({
  queryKey: getAllCategoriesQueryKey(params),
  queryFn: async () => {
    const data = await axios.get<SelectCategoryWithProducts[]>("/api/categories", { params });
    return data.data;
  },
  initialData: initialData as SelectCategoryWithProducts[],
});