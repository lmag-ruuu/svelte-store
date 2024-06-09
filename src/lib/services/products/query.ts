import { createQuery } from "@tanstack/svelte-query";
import axios from "axios";
import type { SelectProduct } from "$lib/db/product.entity";

interface IParams {
  keyword?: string;
  category?: number;
}

const getQueryKey = (params?: IParams) => {
  return ['products', params]
}


export const getAllProducts = (initialData?: SelectProduct[], params?: IParams) => createQuery({
  queryKey: getQueryKey(params),
  queryFn: async () => {
    const data = await axios.get<SelectProduct[]>("/api/products", {
      params
    });
    return data.data;
  },
  initialData: initialData as SelectProduct[],
});