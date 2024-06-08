import { type Actions } from "@sveltejs/kit"; 

export const actions: Actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    console.log(body);
    return {
      status: 200,
      body: JSON.stringify(body)
    };
  },
}