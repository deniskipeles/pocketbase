<script>
    export let jsonData;
    let isModalOpen = false;
  
    function toggleModal() {
      isModalOpen = !isModalOpen;
    }
  </script>
  
  <style>
    .modal-overlay {
      z-index: 9999;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .modal-content {
      max-width: 600px;
      background-color: white;
      padding: 2rem;
      border-radius: 0.5rem;
    }
  
    .json-preview {
      background-color: #f8f8f8;
      padding: 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
    }
  
    .json-preview:hover {
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  </style>
  
  <div class="p-4">
    <pre class="text-sm json-preview">
      {JSON.stringify(jsonData, null, 2)}
    </pre>
    <button
      class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      on:click={toggleModal}
    >
      Preview JSON
    </button>
  </div>
  
  {#if isModalOpen}
    <div class="modal-overlay">
      <div class="modal-content">
        <pre class="text-sm json-preview ">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
        <button
          class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          on:click={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  {/if}
  