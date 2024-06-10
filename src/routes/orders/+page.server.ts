import { getOrdersByCustomer, getOrdersBySupplier } from "$lib/services/orders";
import type { IBaseLocals } from "$lib/services/session/sessionManager";
import { error } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: IBaseLocals }) => {

  const user_type = locals.user?.user_type;
  const user_id = locals.user?.id;

  if (!user_id) {
    return error(401, 'Unauthorized');
  }

  const orders = user_type === 'customer'
    ? await getOrdersByCustomer(+user_id)
    : await getOrdersBySupplier(+user_id);

  return {
    orders,
    session: locals
  }
};