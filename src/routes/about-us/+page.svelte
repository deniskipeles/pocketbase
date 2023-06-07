<script lang="ts">
  import {
    Card,
    Breadcrumb,
    BreadcrumbItem,
    Label,
    Helper,
  } from "flowbite-svelte";
  export let data;
  let hostelName = "Our Hostel";
  let hostelDescription =
    "Welcome to Our Hostel! We are a cozy and friendly accommodation located in the heart of the city. Our mission is to provide a comfortable and memorable stay for our guests. With our convenient location, excellent facilities, and dedicated staff, we strive to make your experience with us unforgettable.";
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem>Account</BreadcrumbItem>
</Breadcrumb>

<div class="max-w-lg mx-auto">
  <h2 class="text-2xl font-bold mb-4">About {hostelName}</h2>

  <p class="text-gray-600">{hostelDescription}</p>
</div>
