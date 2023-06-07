import { bookHostelFxn } from '$lib/server';
import { bookingFormData } from '$lib/stores';
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals: { pb }, request }) => {
    const formData = await request.formData();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };
    let booking_data: string = formData.get('booking_data') as string ?? JSON.stringify({})
    const can_book = JSON.parse(booking_data)

    try {
      const authData = await pb.collection('users').authWithPassword(
        data.email,
        data.password,
      )
      // console.log(authData)
      if (can_book?.name) {
        await bookHostelFxn(pb, authData?.record, can_book)
        bookingFormData.update((vals) => {
          vals.email = "";
          vals.check_in_date = "";
          vals.check_out_date = "";
          vals.name = "";
          return vals;
        });
      }
    } catch (e) {
      console.error(e)
      return { incorrect: true, eroor:'Error occured' };
    }

    throw redirect(301, '/')
  },
}
// XaD5msDYcMjyHTf