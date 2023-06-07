<script>
	import { bookingFormData } from '$lib/stores/index.ts';
  import {
    Card,
    Button,
    Label,
    Input,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem,
    Spinner,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  /** @type {import('./$types').PageData} */
  export let data;
  onMount(() => {
    if (data?.user) {
      goto("/account", { replaceState: true });
    }
  });
  /** @type {import('./$types').ActionData} */
  export let form;
  let loading = false;
  function spinner(params) {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 10000);
  }
  if (form?.error) {
    loading = false;
  }

  import { applyAction, enhance } from "$app/forms";
  import { pb } from "$lib/pocketbase";
  $: booking_data =JSON.stringify($bookingFormData)
</script>

<svelte:head>
  <title>Q&A Form</title>
  <meta name="description" content="Add Questions And Answers Form" />
</svelte:head>

<Breadcrumb class="pt-16 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem>Login</BreadcrumbItem>
</Breadcrumb>

{#if form?.error}
  <!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
  <p class="text-xl text-red-800 dark:text-red-900">ERROR: {form?.error}</p>
{/if}

<div class="text-center">
  <Card>
    <form
      on:submit={spinner}
      class="flex flex-col space-y-6"
      method="POST"
      use:enhance={() => {
        return async ({ result }) => {
          pb.authStore.loadFromCookie(document.cookie);
          await applyAction(result);
        };
      }}
    >
      <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
        Sign in to our platform
      </h3>
      <Label class="space-y-2">
        <span>Email / Username</span>
        <Input
          type="text"
          name="email"
          bind:value={$bookingFormData.email}
          placeholder="user123"
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input type="password" name="password" placeholder="•••••" required />
      </Label>
      {#if $bookingFormData?.name}
         <!-- content here -->
         <input type="hidden" name="booking_data" bind:value={booking_data}>
      {/if}
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a
          href="/"
          class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >Lost password?</a
        >
      </div>
      {#if loading}
        <Button id="b2" class="-mb-2">
          <Spinner />loading...
        </Button>
      {:else}
        <Button type="submit" class="w-full">Login to your account</Button>
      {/if}
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <a
          href="/register"
          class="text-blue-700 hover:underline dark:text-blue-500"
          >Create account</a
        >
      </div>
    </form>
  </Card>
</div>
