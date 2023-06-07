<script lang="ts">
  import type { Record } from "pocketbase";
  import ListRooms from "./rooms/ListRooms.svelte";

  export let data: {
    rooms: Record[];
    hostel: any;
    user: any;
  };
</script>

<div class="p-4 dark:text-white">
  <h2 class="text-2xl font-bold my-4">Hostel</h2>
  <div class="mb-2">
    <span class="font-semibold">Name:</span>
    {data?.hostel?.name}
  </div>
  <div class="mb-2 dark:text-white">
    <span class="font-semibold">Location:</span>
    {data?.hostel?.location?.county}
  </div>

  <h2 class="text-2xl font-bold my-4 dark:text-white">Rooms</h2>
  <ListRooms {data} />
</div>
