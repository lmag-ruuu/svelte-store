import { getCustomerByEmail } from "$lib/services/customers";
import { sessionManager } from "$lib/services/session/sessionManager";
import { getSupplierByEmail } from "$lib/services/suppliers";
import { error, json, type Actions } from "@sveltejs/kit";
import { compare } from 'bcrypt'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return error(400, "Email and password are required");
    }

    const Promises = [
      getCustomerByEmail(email),
      getSupplierByEmail(email)
    ];

    const res = (await Promise.allSettled(Promises)).filter((p) => p.status === "fulfilled");

    if (res.length === 0) {
      return error(401, "Invalid email or password");
    }

    const customer = res[0].value;
    const supplier = res[1].value;

    if (!customer && !supplier) {
      return error(401, "Invalid email or password");
    }

    const user = customer || supplier;

    if (!user) {
      return error(401, "Invalid email or password");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return error(401, "Invalid email or password");
    }
    // manage sesion
    const { error: sessionError, message } = await sessionManager.createSession(cookies, {
      email, user_type: user.user_type
    }, String(user.id));
    if (sessionError) {
      return error(400, {
        message
      });
    }
    return { success: true, message };
  }
}