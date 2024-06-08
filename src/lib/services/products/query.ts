import { createQuery } from "@tanstack/svelte-query";
import axios from "axios";
import type { SelectProduct } from "$lib/db/product.entity";

export const getAllProducts = (initialData?: SelectProduct[]) => createQuery({
  queryKey: ["products"],
  queryFn: async () => {
    const data = await axios.get<SelectProduct[]>("/api/products");
    return data.data;
  },
  initialData: initialData as SelectProduct[],
});