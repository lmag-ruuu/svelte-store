import { createMutation } from '@tanstack/svelte-query'
import type { InsertProduct } from '$lib/db/product.entity';
import axios from 'axios';

export const addProduct = createMutation({
  mutationFn: async (data: FormData) => {
    const res = await axios.post('/products/create', data);
    return res.data;
  }
})