<script>
    let faqItems = [
      {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel your booking up to 48 hours before your check-in date. Please contact our customer support for assistance.",
        isOpen: false
      },
      {
        question: "Do you provide airport transfers?",
        answer: "Yes, we offer airport transfers for an additional fee. You can request this service during the booking process or contact us for more information.",
        isOpen: false
      },
      {
        question: "Is breakfast included?",
        answer: "Breakfast is included in the room rate. We offer a delicious continental breakfast with a variety of options to choose from.",
        isOpen: false
      }
    ];
  
    function toggleAccordion(index) {
      faqItems[index].isOpen = !faqItems[index].isOpen;
    }
  </script>
  
  <div class="max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
  
    {#each faqItems as item, index}
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <h3 class="text-lg font-bold cursor-pointer" on:click={() => toggleAccordion(index)}>
            {item.question}
          </h3>
          <svg class="w-6 h-6 transform" fill="currentColor" viewBox="0 0 20 20" :class={`{ 'rotate-180': item.isOpen }`}>
            <path fill-rule="evenodd" d="M10 3.16a.75.75 0 0 0-1.06 0l-6.25 6.25a.75.75 0 1 0 1.06 1.06L10 5.06l5.16 5.16a.75.75 0 1 0 1.06-1.06L10 3.16z"></path>
          </svg>
        </div>
  
        {#if item.isOpen}
          <p class="mt-2">{item.answer}</p>
        {/if}
      </div>
    {/each}
  </div>
  
  <style>
    .rotate-180 {
      transform: rotate(180deg);
    }
  </style>
  