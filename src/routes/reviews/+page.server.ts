import { loadHostelReviews } from '$lib/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { pb, hostel, user } }) {
  const reviews = await loadHostelReviews(pb,hostel)

  return {
    reviews,
    hostel,
    user
  };
}
