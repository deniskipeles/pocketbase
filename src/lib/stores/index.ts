import type { Record } from "pocketbase";
import { writable, type Writable } from "svelte/store";


// Create a writable store for form data
export const bookingFormData = writable({
    room_id: '',
    check_in_date: '',
    check_out_date: '',
});

export const hostel_review_agg:Writable<Record|any> = writable({
    "hostel_id": "RECORD_ID",
    "mean_rate": 4.5,
    "mode_rate": 5,
    "median_rate": 4,
    "total_reviews": 50,
    "max_rate": 5,
    "min_rate": 3,
    "rating_counts": [
      { "rating": 1, "rating_count": 10 },
      { "rating": 2, "rating_count": 5 },
      { "rating": 3, "rating_count": 8 },
      { "rating": 4, "rating_count": 20 },
      { "rating": 5, "rating_count": 7 }
    ]
  })