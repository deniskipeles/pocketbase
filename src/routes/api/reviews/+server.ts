
import { createReviews } from '$lib/server';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals: { pb, user, hostel } }) {
    let data = await request.json()
    data = {
        ...data,
        hostel_id: hostel?.id
    }
    try {
        const res = await createReviews(pb,data, user?.id as string)

        return json({ success: true, data: res });
    } catch (error: any) {
        return json({ success: false, error: error?.message });
    }
}
