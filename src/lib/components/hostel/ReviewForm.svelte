<script lang="ts">
  import { goto } from "$app/navigation";
  import type { ListResult, Record } from "pocketbase";
  import { writable } from "svelte/store";
  import StarRatingComp from "../StarRatingComp.svelte";
  import { Spinner } from "flowbite-svelte";

  export let data: {
    reviews: ListResult<Record>;
    hostel: Record;
    user: Record;
  };
  const reviewData = {
    comment: "",
    rate: 1,
  };
  // Create a writable store to hold the form data
  const formData = writable(reviewData);

  let loading = false;
  let review_error = "";
  let review_successfully = false;
  async function handleSubmit() {
    const dt = $formData;
    if (data?.user) {
      loading = true;
      review_successfully = false;
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(dt),
        headers: {
          "content-type": "application/json",
        },
      });
      const res = await response.json();

      if (res?.success) {
        loading = false;
        review_error = "";
        review_successfully = true;
        formData.update((vals) => {
          vals.comment = "";
          vals.rate = 1;
          return vals;
        });
        setTimeout(() => {
          review_successfully = false;
        }, 15000);
      } else {
        loading = false;
        review_error = res?.error;
      }
    } else {
      goto("/login", { replaceState: true });
    }
  }

  function handleRatingClick(value: any) {
    // console.log(value)
    formData.update((vals) => {
      vals.rate = value;
      return vals;
    });
  }
</script>

<form class="max-w-md mx-auto p-4" on:submit|preventDefault={handleSubmit}>
  <div class="mb-4">
    <label class="block font-medium mb-2" for="comment">Comment:</label>
    <textarea
      class="w-full px-3 py-2 border border-gray-300 rounded"
      id="comment"
      bind:value={$formData.comment}
    />
  </div>

  <div class="mb-4">
    <label class="block font-medium mb-2" for="rate">
      Rate: {$formData.rate}
    </label>
    <StarRatingComp bind:value={$formData.rate} {handleRatingClick} />
  </div>

  <div class="text-center">
    {#if loading}
      <!-- content here -->
      <button
        class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="button"
        ><Spinner />submitting...
      </button>
    {:else}
      <!-- else content here -->
      <button
        class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="submit">Submit</button
      >
    {/if}
  </div>
</form>
