import type { IBaseLocals } from "$lib/services/session/sessionManager";

export const load = ({ locals }: { locals: IBaseLocals }) => {
  return {
    session: locals
  }
}

export type Load = ReturnType<typeof load>;