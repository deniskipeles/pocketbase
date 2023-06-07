import { loadHostelOtherServices } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  let { pb, ...rest } = locals
  const services = await loadHostelOtherServices(pb, rest?.hostel)

  return {
    ...rest,
    services,
  };
}
