import { placeOrder, type IOrderPayload } from "$lib/services/orders/index.js";
import type { IBaseLocals } from "$lib/services/session/sessionManager.js";
import { error } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: IBaseLocals }) => {
  return {
    session: locals
  };
};

export const actions = {
  default: async ({ request, locals: _locals }) => {
    const locals = _locals as IBaseLocals;
    const formData = await request.formData();
    const data: IOrderPayload = {
      city: formData.get('city')?.toString()!,
      country: formData.get('country')?.toString()!,
      state: formData.get('state')?.toString()!,
      postal_code: formData.get('postalCode')?.toString()!,
      order_date: new Date().toISOString().split('T')[0],
      customer_id: locals.user?.id!,
      products: JSON.parse(formData.get('products')?.toString()!)
    }

    console.log({
      data
    })

    try {
      await placeOrder(data);
    } catch (e) {
      const err = e as Error;
      return error(400, err.message);
    }
    return {
      data
    };

  }
}