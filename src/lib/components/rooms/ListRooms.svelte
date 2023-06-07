<script lang="ts">
  import { Card, Button } from "flowbite-svelte";
  import type { Record } from "pocketbase";
  import BookingForm from "../hostel/BookingForm.svelte";

  export let data: {
    rooms: Record[];
    hostel: any;
    user: any;
  };
  // your script goes here
</script>

<div>
  <div class="grid relative md:grid-cols-3 gap-6">
    {#each data?.rooms as room}
      <Card>
        <h3 class="text-xl font-semibold">{room?.room_name}</h3>
        <div class="mb-2">
          <span class="font-semibold">Price:</span>
          {room?.room_price}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Amenities:</span>
          <ul>
            {#each Array.isArray(room?.expand?.amenities_ids) ? room?.expand?.amenities_ids : [] as amenityId}
              <!-- {#if amenityId in room.amenities_ids} -->
              <li>
                {amenityId?.service}
              </li>
              <!-- {/if} -->
            {/each}
          </ul>
        </div>
        <BookingForm {data} {room} />
      </Card>
    {/each}
  </div>
</div>
