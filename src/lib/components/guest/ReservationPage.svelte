<script>
  import { getReadableDate } from "$lib/tools";
  import { Card } from "flowbite-svelte";

  export let jsonData;
</script>

<div>
  <div class="grid relative md:grid-cols-3 gap-6">
    {#each jsonData?.items ?? [] as item}
      <Card size="lg" padding="xl">
        <div class="mb-4">
          <h2 class="text-2xl font-bold">{item?.room_name}</h2>
          <div class="mb-2">
            <span class="font-semibold">Guest Name:</span>
            {item?.guest_name}
          </div>
          <div class="mb-2">
            <span class="font-semibold">Check-in Date:</span>
            {getReadableDate(item?.start_date)}
          </div>
          <div class="mb-2">
            <span class="font-semibold">Check-out Date:</span>
            {getReadableDate(item?.end_date)}
          </div>
          <div class="mb-2">
            <span class="font-semibold">Payment Amount:</span>
            {item?.payment_amount}
          </div>
          <div class="mb-2">
            <span class="font-semibold">Payment Method:</span>
            {item?.payment_method}
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>
