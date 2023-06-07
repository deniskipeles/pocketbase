<script lang="ts">
  import { goto } from "$app/navigation";
  import { bookingFormData } from "$lib/stores";
  import { Button, CloseButton, Drawer, Spinner } from "flowbite-svelte";
  import type { Record } from "pocketbase";
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  export let data: {
    rooms: Record[];
    hostel: any;
    user: any;
  };
  export let room:Record;

  let loading = false;
  let booking_error = "";
  let booking_successfully = false;
  async function handleSubmit() {
    // Handle form submission here
    let { ...dt } = $bookingFormData;
    dt = {
      ...dt,
      room_id:room?.id
    }
    if (data?.user) {
      loading = true;
      booking_successfully = false;
      const response = await fetch("/api/bookings/partial", {
        method: "POST",
        body: JSON.stringify(dt),
        headers: {
          "content-type": "application/json",
        },
      });
      const res = await response.json();

      if (res?.success) {
        loading = false;
        booking_error = "";
        booking_successfully = true;
        bookingFormData.update((vals) => {
          vals.check_in_date = "";
          vals.check_out_date = "";
          vals.room_id = "";
          return vals;
        });
        setTimeout(() => {
          booking_successfully = false;
        }, 15000);
      } else {
        loading = false;
        booking_error = res?.error;
      }
    } else {
      goto("/login", { replaceState: true });
    }
  }

  onMount(() => {
    bookingFormData.update((vals) => {
      vals.room_id = room?.id;
      return vals;
    });
  });

  let hidden = true;
</script>

<Button on:click={() => (hidden = false)} color="blue" pill>
  BOOK THIS ROOM
</Button>

<Drawer
  activateClickOutside={true}
  transitionType="fly"
  {transitionParams}
  bind:hidden
  id="sidebar1"
>
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      <svg
        class="w-5 h-5 mr-2"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >BOOK A ROOM
    </h5>
    <CloseButton
      on:click={() => (hidden = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <div
    class="max-w-md mx-auto p-6 bg-white dark:bg-slate-700 dark:text-slate-200 rounded shadow"
  >
    <h2 class="text-2xl font-bold mb-4">Hostel Booking</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-4">
        <label for="checkInDate" class="block text-sm font-medium text-gray-700"
          >Check-in Date</label
        >
        <input
          type="date"
          id="checkInDate"
          bind:value={$bookingFormData.check_in_date}
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="checkOutDate"
          class="block text-sm font-medium text-gray-700">Check-out Date</label
        >
        <input
          type="date"
          id="checkOutDate"
          bind:value={$bookingFormData.check_out_date}
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>

      {#if loading}
        <!-- content here -->
        <button
          type="submit"
          class="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Spinner />Booking...
        </button>
      {:else}
        <!-- else content here -->
        <button
          type="submit"
          class="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Book Now
        </button>
      {/if}
    </form>

    {#if booking_successfully}
      <p class="text-lg font-semibold text-green-600">
        Your Booking Has Been Submitted. Keep Checking On Reservation To Check If You Been Accepted.
      </p>
    {/if}
    {#if booking_error}
      <p class="text-lg font-semibold text-red-600">
        {booking_error}
      </p>
    {/if}
  </div>
</Drawer>
