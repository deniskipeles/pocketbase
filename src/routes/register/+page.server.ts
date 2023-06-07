import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const formData = await request.formData();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordConfirm: formData.get('passwordConfirm') as string
    };
    

    try {
      await locals.pb.collection('users').create(data)
      await locals.pb.collection('users').requestVerification(data?.email);
      await locals.pb
        .collection('users')
        .authWithPassword(data.email, data.password)
    } catch (e) {
      console.error(e)
      throw e
    }

    throw redirect(301, '/')
  },
}