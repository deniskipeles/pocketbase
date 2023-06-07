import { PUBLIC_KEY } from '$env/static/public';
import { serializeNonPOJOs } from '$lib/tools';

export async function loadHostels(pb: import('pocketbase').default) {

    let record = await pb.collection('hostels').getOne(PUBLIC_KEY, {
        expand: 'amenities',
    });

    record = serializeNonPOJOs(record);
    return record;
}



export async function loadHostelReviews(pb: import('pocketbase').default, hostel: any) {
    let record = await pb.collection('return_reviews').getList(1, 50, {
        sort: '-created',
        filter: `hostel_id = "${hostel?.id}"`,
    });

    record = serializeNonPOJOs(record);
    return record;
}




export async function createReviews(pb: import('pocketbase').default, data: any, user_id: string) {
    try {
        let filter = `user_id="${user_id}"`;
        let guest = await pb.collection('guests').getFirstListItem(filter, {
            sort: '-created',
        });
        data = {
            ...data,
            guest_id: guest?.id
        }
        let record = await pb.collection('reviews').create(data);
        record = serializeNonPOJOs(record);
        return record;
    } catch (error: any) {
        throw new Error(`${error?.message}`)
    }

}
