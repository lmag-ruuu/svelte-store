import type { IBaseLocals } from "$lib/services/session/sessionManager";

export const load = async ({ locals }: { locals: IBaseLocals }) => {
  return {
    session: locals
  };
};