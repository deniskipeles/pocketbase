<script lang="ts">
  import HomePage from "$lib/components/HomePage.svelte";
  import BookingForm from "$lib/components/hostel/BookingForm.svelte";
  import { pb } from "$lib/pocketbase";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  /** @type {import('./$types').PageData} */
  export let data: any;
  $: background = data?.hostel?.logo
    ? pb.files.getUrl(data?.hostel, data?.hostel?.logo, { thumb: "500x500" })
    : "/images/img1.jpg";
</script>

<svelte:head>
  <title>{data?.hostel?.name}</title>
  <meta name="description" content={data?.hostel?.description} />
</svelte:head>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

{#if data?.user}
  <HomePage {data} />
{:else}
  <div
    class="dark:text-white w-full h-full bg-center bg-cover opacity-50 bg-slate-800"
    style={`background-image: url(${background});`}
  >
    <HomePage {data} />
  </div>
{/if}
