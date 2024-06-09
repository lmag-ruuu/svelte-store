import { createQuery } from "@tanstack/svelte-query";
import axios from "axios";
import type { SelectProduct } from "$lib/db/product.entity";

export interface IProductSearchParams {
  keyword?: string;
  category?: number;
}

const getQueryKey = (params?: IProductSearchParams) => {
  return ['products', params]
}


export const getAllProducts = (initialData?: SelectProduct[], params?: IProductSearchParams) => createQuery({
  queryKey: getQueryKey(params),
  queryFn: async () => {
    const data = await axios.get<SelectProduct[]>("/api/products", {
      params
    });
    return data.data;
  },
  initialData: initialData as SelectProduct[],
});