<script>
  export let value = 0;
  export let handleRatingClick;
</script>

<div class="flex items-center space-x-1">
  {#each [1, 2, 3, 4, 5] as rating}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg
      class="w-10 h-10 cursor-pointer"
      fill={rating <= value ? "green" : "black"}
      on:click={handleRatingClick(rating)}
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M10 0L13.09 6.22754H20L14.82 10.0907L17.91 16.3182L10 12.4549L2.09 16.3182L5.18 10.0907L0 6.22754H6.91L10 0Z"
      />
    </svg>
  {/each}
</div>
