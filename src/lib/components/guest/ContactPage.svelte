<script>
    let contacts = [
      {
        name: "John Doe",
        position: "Manager",
        email: "johndoe@example.com",
        phone: "+1 123-456-7890"
      },
      {
        name: "Jane Smith",
        position: "Front Desk",
        email: "janesmith@example.com",
        phone: "+1 987-654-3210"
      }
    ];
  </script>
  
  <div class="max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">Contact Information</h2>
  
    {#each contacts as contact}
      <div class="mb-4">
        <h3 class="text-lg font-bold">{contact.name}</h3>
        <p class="text-gray-600">{contact.position}</p>
        <p>Email: <a href="mailto:{contact.email}">{contact.email}</a></p>
        <p>Phone: <a href="tel:{contact.phone}">{contact.phone}</a></p>
      </div>
    {/each}
  </div>
  