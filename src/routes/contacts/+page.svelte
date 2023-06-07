<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Card } from "flowbite-svelte";
  export let data;

  let contacts = [
    {
      name: "John Doe",
      position: "Manager",
      email: "johndoe@example.com",
      phone: "+1 123-456-7890",
    },
    {
      name: "Jane Smith",
      position: "Front Desk",
      email: "janesmith@example.com",
      phone: "+1 987-654-3210",
    },
  ];
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem>Contacts</BreadcrumbItem>
</Breadcrumb>

<div>
  <h2 class="text-2xl font-bold mb-4">Contact Information</h2>

  <div class="grid relative md:grid-cols-3 gap-6">
    {#each contacts as contact}
      <Card>
        <div>
          <h3 class="text-lg font-bold">{contact.name}</h3>
          <p class="text-gray-600">{contact.position}</p>
          <p>Email: <a href="mailto:{contact.email}">{contact.email}</a></p>
          <p>Phone: <a href="tel:{contact.phone}">{contact.phone}</a></p>
        </div>
      </Card>
    {/each}
  </div>
</div>
