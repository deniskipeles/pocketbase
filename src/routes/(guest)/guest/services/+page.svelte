<script lang="ts">
  import ServicesPage from "$lib/components/guest/ServicesPage.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";

  /** @type {import('./$types').PageData} */
  export let data: {
    services: ListResult<Record>;
    user: Record | Admin | null;
    hostel: Record;
  };
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<div>
  <ServicesPage {data} />
</div>
