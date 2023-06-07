<script>
    export let payments = [];
  </script>
  
  <template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">Payments Page</h1>
      <table class="w-full bg-white border border-gray-200 rounded shadow-sm">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Date</th>
            <th class="px-6 py-3 text-left font-semibold">Amount</th>
            <th class="px-6 py-3 text-left font-semibold">Method</th>
            <!-- Add additional table headers as needed -->
          </tr>
        </thead>
        <tbody>
          {#each payments as payment}
            <tr>
              <td class="px-6 py-4">{payment.date}</td>
              <td class="px-6 py-4">{payment.amount}</td>
              <td class="px-6 py-4">{payment.method}</td>
              <!-- Display additional payment details in table cells -->
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </template>
  
  <style>
    /* Styles for Payments Page */
    /* ... */
  </style>
  