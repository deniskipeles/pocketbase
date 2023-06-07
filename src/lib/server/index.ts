import { canMakeBooking, getReadableDate, isWithinPastDays, serializeNonPOJOs } from "$lib/tools";
import type { Admin, Record, RecordAuthResponse } from "pocketbase";
import { createReviews, loadHostelReviews, loadHostels } from "./hostels";
import { loadHostelReservations } from "./reservations";
import { loadHostelRooms, loadHostelRoomsStats } from "./rooms";
import { loadHostelOtherServices } from "./services";

export {
    loadHostels,
    loadHostelRooms,
    loadHostelRoomsStats,
    loadHostelReservations,
    loadHostelOtherServices,
    loadHostelReviews,
    createReviews,
}



export async function bookHostelFxn(pb: import('pocketbase').default, user_id: string, booking_data: any) {
    let filter = `user_id="${user_id}"`;
    let obj = await pb.collection('partial_bookings').getFirstListItem(filter, {
        sort:'-created',
    });
    console.log(obj)
    const allow = canMakeBooking(obj?.check_out_date)
    if (!allow && obj?.accept) {
        throw new Error(`You can not book a room. Since your lease has not expired. From ${getReadableDate(obj?.check_in_date)} to ${getReadableDate(obj?.check_out_date)}`);
    }
    const last_days = isWithinPastDays(obj?.created,7)
    if (!allow && !obj?.accept && last_days) {
        throw new Error(`You can not book a room. Since you made a request within last 7 days [${getReadableDate(obj?.created)}]. The requested lease is from ${getReadableDate(obj?.check_in_date)} to ${getReadableDate(obj?.check_out_date)}`);
    }

    const data = {
        ...booking_data,
        user_id,
    };

    let record = await pb.collection('partial_bookings').create(data);
    record = serializeNonPOJOs(record)
    return record
}