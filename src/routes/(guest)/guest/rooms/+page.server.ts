import { loadHostelRooms } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  let { pb, ...rest } = locals
  const rooms = await loadHostelRooms(pb, rest?.hostel)

  return {
    ...rest,
    rooms,
  };
}
