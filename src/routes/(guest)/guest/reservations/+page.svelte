<script lang="ts">
  import ReservationPage from "$lib/components/guest/ReservationPage.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  export let data;
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<div>
  <ReservationPage jsonData={data?.records} />
</div>
