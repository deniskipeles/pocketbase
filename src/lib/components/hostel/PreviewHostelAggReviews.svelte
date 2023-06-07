<script>
  import { hostel_review_agg } from "$lib/stores";

  $: data = $hostel_review_agg;
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Hostel Reviews Aggregation</h1>

  <div>
    <h2 class="text-lg font-bold">Mean Rate:</h2>
    <pre class="bg-gray-100 p-2 rounded">{JSON.stringify(data.mean_rate)}</pre>
  </div>

  <div>
    <h2 class="text-lg font-bold">Mode Rate:</h2>
    <pre class="bg-gray-100 p-2 rounded">{JSON.stringify(data.mode_rate)}</pre>
  </div>

  <div>
    <h2 class="text-lg font-bold">Median Rate:</h2>
    <pre class="bg-gray-100 p-2 rounded">{JSON.stringify(
        data.median_rate
      )}</pre>
  </div>

  <div>
    <h2 class="text-lg font-bold">Total Reviews:</h2>
    <p>{data.total_reviews}</p>
  </div>

  <div>
    <h2 class="text-lg font-bold">Max Rate:</h2>
    <pre class="bg-gray-100 p-2 rounded">{JSON.stringify(data.max_rate)}</pre>
  </div>

  <div>
    <h2 class="text-lg font-bold">Min Rate:</h2>
    <pre class="bg-gray-100 p-2 rounded">{JSON.stringify(data.min_rate)}</pre>
  </div>
</div>

<style>
  .p-4 {
    padding: 1rem;
  }

  .text-2xl {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .text-lg {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .bg-gray-100 {
    background-color: #f7fafc;
  }

  .p-2 {
    padding: 0.5rem;
  }

  .rounded {
    border-radius: 0.375rem;
  }
</style>
