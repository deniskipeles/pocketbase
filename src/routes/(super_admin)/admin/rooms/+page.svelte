<script lang="ts">
  import ListRoomsStats from '$lib/components/rooms/ListRoomsStats.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

  export let data;
</script>


<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<div>
  <ListRoomsStats jsonData={data?.rooms} />
</div>
