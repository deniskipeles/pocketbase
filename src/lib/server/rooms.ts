import { serializeNonPOJOs } from '$lib/tools';

export async function loadHostelRooms(pb: import('pocketbase').default, hostel: any) {

    let record = await pb.collection('return_rooms_in_hostel').getFullList({
        // sort: '-created',
        filter: `hostel_id = "${hostel?.id}"`,
        expand: 'amenities_ids'
    });
    record = serializeNonPOJOs(record);
    return record;
}




export async function loadHostelRoomsStats(pb: import('pocketbase').default, hostel: any) {

    let record = await pb.collection('room_guests_data_stats').getList(1, 50, {
        // filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    });
    record = serializeNonPOJOs(record);
    return record;
}

