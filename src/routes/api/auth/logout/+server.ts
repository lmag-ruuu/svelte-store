import { sessionManager } from '$lib/services/session/sessionManager'
import { redirect } from '@sveltejs/kit'
export const POST = async ({ cookies }) => {
  await sessionManager.deleteSession(cookies)
  return new Response(null, { status: 200 });
}