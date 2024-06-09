import { getCustomerByEmail } from "$lib/services/customers";
import { getSupplierByEmail } from "$lib/services/suppliers";
import { error, type Actions } from "@sveltejs/kit";
import { compare } from 'bcrypt'

export const actions: Actions = {
  default: async ({ request }) => {
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

    if (customer) {
      const isValid = await compare(password, customer.password);
      if (!isValid) {
        return error(401, "Invalid email or password");
      }
      return {
        user: customer
      }
    } else if (supplier) {
      const isValid = await compare(password, supplier.password);
      if (!isValid) {
        return error(401, "Invalid email or password");
      }
      return {
        user: supplier
      }
    }

    return error(401, "Invalid email or password");

  }
}