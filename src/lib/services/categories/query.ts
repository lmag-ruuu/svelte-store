import { createQuery } from "@tanstack/svelte-query";
import type { SelectCategory } from "$lib/db/category.entity";
import axios from "axios";

export const getAllCategoriesQuery = (initialData?: SelectCategory[]) => createQuery({
  queryKey: ["categories"],
  queryFn: async () => {
    const data = await axios.get<SelectCategory[]>("/api/categories"); 
    return data.data;
  },
  initialData: initialData as SelectCategory[],
});