<script lang="ts">
  import ReviewsComp from "$lib/components/hostel/ReviewsComp.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import type { ListResult, Record } from "pocketbase";

  /** @type {import('./$types').PageData} */
  export let data: {
    reviews: ListResult<Record>;
    hostel: Record;
    user: Record;
  };
</script>

<!-- <svelte:head>
    <title>{data?.hostel?.name}</title>
    <meta name="description" content={data?.hostel?.description} />
  </svelte:head> -->

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

<ReviewsComp {data} />
