<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import type { Admin, ListResult, Record } from "pocketbase";

  export let data: {
    services: ListResult<Record>;
    user: Record | Admin | null;
    hostel: Record;
  };

  function formatDateTime(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  const returnImageUrl = (record: Record, imgUrl: string) => {
    imgUrl = imgUrl
      ? pb.files.getUrl(record, imgUrl, { thumb: "100x100" })
      : "/images/img1.jpg";
    // console.log(imgUrl)
    return imgUrl;
  };
</script>

<div class="p-4 dark:bg-gray-900 dark:text-white bg-white text-black">
  <h1 class="text-2xl font-bold mb-4">Additional Services</h1>

  {#each data?.services?.items as item}
    <div class="mb-4">
      <h2 class="text-xl font-bold">{item?.service}</h2>
      <p>Created: {formatDateTime(item?.created)}</p>
      <p>Updated: {formatDateTime(item?.updated)}</p>
      <p>Available: {item?.available ? "Yes" : "No"}</p>
      <p>Hostel ID: {item?.hostel_id}</p>

      <h3 class="text-lg font-bold mt-4">Photos:</h3>
      <ul class="list-disc ml-6">
        {#each item?.photos ?? [] as photo}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <li>
            <img
              class="max-w-xs mb-2"
              src={returnImageUrl(item, photo)}
              alt="Service Photo"
            />
          </li>
        {/each}
      </ul>

      <hr class="my-4" />
    </div>
  {/each}

  {#if data?.services?.items?.length === 0}
    <p>No additional services found.</p>
  {/if}
</div>
