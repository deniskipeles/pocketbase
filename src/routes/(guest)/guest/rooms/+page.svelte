<script lang="ts">
  import ListRooms from "$lib/components/rooms/ListRooms.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  /** @type {import('./$types').PageData} */
  export let data: any;
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<div>
  <ListRooms {data} />
</div>
