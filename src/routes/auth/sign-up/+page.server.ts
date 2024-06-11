import type { InsertCustomer } from "$lib/db/customer.entity";
import { createCustomer } from "$lib/services/customers";
import type { IBaseLocals } from "$lib/services/session/sessionManager";
import { createSupplier } from "$lib/services/suppliers";
import { error, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { hash, genSalt } from 'bcrypt';

const prepareUser = async ({ request }: RequestEvent<Partial<Record<string, string>>, string | null>): Promise<InsertCustomer> => {
  const body = await request.formData();
  const name = body.get('name')?.toString();
  const email = body.get('email')?.toString();
  const user_type = body.get('user_type')?.toString();
  const password = body.get('password')?.toString();
  if (!name || !email || !password || !user_type) {
    return error(400, { message: 'Fields required reason missing' });
  }
  const salt = await genSalt(8);
  const hashedPassword = await hash(password, salt);

  return {
    name,
    email,
    password: hashedPassword,
    user_type
  };

}

export const actions: Actions = {
  "sign-up-customer": async (props) => {
    const body = await prepareUser(props);
    try {
      await createCustomer(body);
      return { message: 'Customer created' };
    } catch (_e) {
      const e = _e as Error;
      return error(400, { message: e.message });
    }
  },
  "sign-up-supplier": async (props) => {
    const body = await prepareUser(props);
    try {
      await createSupplier(body);
      return { message: 'Supplier created' };
    } catch (_e) {
      const e = _e as Error;
      return error(400, { message: e.message });
    }
  }
}

export const load = ({ locals }: { locals: IBaseLocals }) => {

  if (locals.isUserLoggedIn) {
    redirect(302, '/')
  }

  return {
    session: locals
  }
}