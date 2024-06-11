import type { IBaseLocals } from "$lib/services/session/sessionManager";
import { redirect } from "@sveltejs/kit";

export const load = ({ locals }: { locals: IBaseLocals }) => {

  if (!locals.isUserLoggedIn) {
    redirect(302, '/auth/sign-in')
  }

  return {
    session: locals
  }
}

export type Load = ReturnType<typeof load>;