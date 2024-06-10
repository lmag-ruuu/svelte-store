import { sessionManager } from '$lib/services/session/sessionManager';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const userSession = await sessionManager.getSession(await event.cookies);

  event.locals = {
    isUserLoggedIn: false,
    user: null
  };
  if (userSession.error) {
    await sessionManager.deleteCookie(await event.cookies);
    return resolve(event);
  }
  if (userSession && userSession.data) {
    event.locals = {
      isUserLoggedIn: true,
      user: {
        email: userSession?.data?.email as string,
        user_type: userSession?.data?.user_type as string,
        id: userSession?.data?.id as number
      }
    };
  }
  return resolve(event);
};