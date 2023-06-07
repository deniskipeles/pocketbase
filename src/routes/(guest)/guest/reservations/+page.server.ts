import { loadHostelReservations } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({  locals }) {
  // const parentData = await parent();
  let { pb, ...rest } = locals
  const records = await loadHostelReservations(pb, rest?.user?.id)
  // console.log(rooms)

  return {
    ...rest,
    records,
  };
}
