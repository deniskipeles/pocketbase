import { bookHostelFxn } from '$lib/server';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals: { pb, user } }) {
    const data = await request.json()
    try {
        const res = await bookHostelFxn(pb, user?.id as string, data)

        return json({ success: true, data: res });
    } catch (error: any) {
        return json({ success: false, error: error?.message });
    }
}
