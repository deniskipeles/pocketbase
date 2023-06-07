import { serializeNonPOJOs } from '$lib/tools';

export async function loadHostelOtherServices(pb: import('pocketbase').default, hostel: import('pocketbase').Record) {

    let record = await pb.collection('additional_Services').getList(1, 50, {
        filter: `hostel_id = "${hostel?.id}"`,
    });

    record = serializeNonPOJOs(record);
    return record;
}
