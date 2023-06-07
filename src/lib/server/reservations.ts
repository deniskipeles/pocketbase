import { serializeNonPOJOs } from '$lib/tools';

export async function loadHostelReservations(pb: import('pocketbase').default, user_id: string | undefined) {

    let record = await pb.collection('guest_reservations').getList(1, 50, {
        // expand: 'amenities',
        filter: `user_id = "${user_id}"`,
    });

    record = serializeNonPOJOs(record);
    return record;
}
