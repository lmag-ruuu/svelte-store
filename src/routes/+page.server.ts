import type { IBaseLocals } from "$lib/services/session/sessionManager";

export const load = ({ locals }: { locals: IBaseLocals }) => {
  const user = locals.user;
  return {
    session: locals
  }
}

export type Load = ReturnType<typeof load>;