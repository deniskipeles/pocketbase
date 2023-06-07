import { loadHostelRooms } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, locals: { pb, hostel, user } }) {
  const rooms = await loadHostelRooms(pb,hostel)
  // console.log(rooms)

  return {
    rooms,
    hostel,
    user
  };
}
