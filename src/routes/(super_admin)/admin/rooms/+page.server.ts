import { loadHostelRoomsStats } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({  locals }) {
  // const parentData = await parent();
  let { pb, ...rest } = locals
  const rooms = await loadHostelRoomsStats(pb, rest?.hostel)
  // console.log(rooms)

  return {
    ...rest,
    rooms,
  };
}
