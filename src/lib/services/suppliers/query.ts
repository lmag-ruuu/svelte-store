import type { SelectSupplier } from "$lib/db/supplier.entity";
import { createQuery } from "@tanstack/svelte-query";
import axios from "axios";

interface IParams { }

const getAllSuppliersQueryKey = (params?: IParams) => {
  return [
    "supplier",
    params,
  ];
};

export const getAllSuppliersQuery = (initialData?: SelectSupplier[], params?: IParams) => createQuery({
  queryKey: getAllSuppliersQueryKey(),
  queryFn: async () => {
    const data = await axios.get<SelectSupplier[]>("/api/suppliers");
    return data.data;
  },
  initialData: initialData as SelectSupplier[],
});