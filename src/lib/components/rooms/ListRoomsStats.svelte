<script>
  import { Card, Button, Popover } from "flowbite-svelte";
  import JsonPreview from "../JsonPreview.svelte";

  export let jsonData;
</script>

<div>
  <div class="grid relative md:grid-cols-3 gap-6">
    {#each jsonData?.items as item}
      <Card>
        <h2 class="text-2xl font-bold">{item?.name}</h2>
        <div class="mb-2">
          <span class="font-semibold">Price:</span>
          {item?.price}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Guests:</span>
          {item?.totalGuests}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Amount:</span>
          {item?.totalAmount ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Guests Last Month:</span>
          {item?.guests_last_month ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Guests Last Three Months:</span>
          {item?.guests_last_three_months ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Guests Last Six Months:</span>
          {item?.guests_last_six_months ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Guests Last Twelve Months:</span>
          {item?.guests_last_twelve_months ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Amount Last Month:</span>
          {item?.totalAmount_last_month ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Amount Last Three Months:</span>
          {item?.totalAmount_last_three_months ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Amount Last Six Months:</span>
          {item?.totalAmount_last_six_months ?? "N/A"}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Total Amount Last Twelve Months:</span>
          {item?.totalAmount_last_twelve_months ?? "N/A"}
        </div>
        <Button id="b1">More</Button>
        <Popover
          class="modal-overlay text-sm font-light "
          title="All Data"
          triggeredBy="#b1"
          trigger="click"
          placement="bottom"
        >
          <JsonPreview jsonData={item} />
        </Popover>
      </Card>
    {/each}
  </div>
</div>
