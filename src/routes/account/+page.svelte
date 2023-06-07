<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import {
    removeSpaces,
    serializeNonPOJOs,
    setObjectFormData,
  } from "$lib/tools";
  import {
    Card,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Label,
    Input,
    Spinner,
    Fileupload,
    Helper,
    Textarea,
    Progressbar,
  } from "flowbite-svelte";
  import { writable, type Writable } from "svelte/store";

  /** @type {import('./$types').PageData} */
  export let data: any;
  let username = data?.user?.username;

  const photo: Writable<null | string> = writable(
    data?.user?.avatar
      ? pb.files.getUrl(data?.user, data?.user?.avatar, { thumb: "50x50" })
      : "/images/img1.jpg"
  );
  const user = writable(data?.user);

  let updating = false;
  let updateError = "";
  let updateSuccess = false;
  
  function handleUpdate() {
    updateSuccess = false;
    updating = true;
    updateError = "";

    let { ...dt } = $user;
    dt = setObjectFormData(dt);
    let record = pb.collection("users").update($user?.id, dt);
    record = serializeNonPOJOs(record);
    data.user = record;
    username = data?.user?.username;
    if (record) {
      updateSuccess = true;
      updating = false;
      updateError = "";
      user.set(record);
    } else {
      updating = false;
      updateError = "studentError?.message;";
      updateSuccess = false;
    }
  }

  let formData = new FormData();
  let fileInput: any;

  function clearFileInput() {
    fileInput.value = null;
  }
  let uploading = false;
  $: progress = "0";

  const fileUpload = async () => {
    // upload and create new record
    if (fileInput) {
      uploading = true;
      setTimeout(() => {
        progress = "20";
      }, 200);
      const updatedRec = await pb
        .collection("users")
        .update($user?.id, formData);
      setTimeout(() => {
        progress = "50";
      }, 400);
      let image = updatedRec?.avatar
        ? pb.files.getUrl(updatedRec, updatedRec?.avatar, { thumb: "100x100" })
        : "/images/img1.jpg";
      photo.set(image);
      setTimeout(() => {
        progress = "90";
      }, 500);
      setTimeout(() => {
        progress = "95";
      }, 1000);
      uploading = false;
    }
  };
  const setFile = async (event: any) => {
    formData.append("avatar", event.target.files[0]);
    if (formData.has("avatar")) {
      await fileUpload();
      formData.delete("avatar");
      clearFileInput();
    }
  };

  let username_exist = false;
  const checkUsername = async (event: any) => {
    let name = event.target.value ?? "user";
    name = removeSpaces(name);
    event.target.value = name;
    let filter = `username="${name}"`;
    try {
      let record = await pb
        .collection("check_username_existance")
        .getFirstListItem(filter);
      if (record?.username != username) {
        username_exist = true;
      }
    } catch (error) {
      console.log(error);
      username_exist = false;
    }
  };
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem>Account</BreadcrumbItem>
</Breadcrumb>

<div>
  <div class="grid relative md:grid-cols-3 gap-6">
    <Card padding="sm">
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name2" class="mb-2">Name:</Label>
        {$user?.name}
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name2" class="mb-2">Username:</Label>
        {$user?.username}
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name2" class="mb-2">Verified:</Label>
        {$user?.verified ? "yes" : "No"}
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name2" class="mb-2">Email:</Label>
        {$user?.email ?? "No Email"}
      </p>
    </Card>

    <Card padding="sm">
      <!-- svelte-ignore a11y-missing-attribute -->
      <img src={$photo} />
      <Label for="fileInput" class="pb-2 text-xs font-thin"
        >{photo ? "Update Your Image" : "Upload Your Image"}</Label
      >
      {#if uploading}
        <div class="my-4">
          <div
            class="mb-1 text-base font-medium text-green-700 dark:text-green-500"
          >
            Green
          </div>
          <Progressbar {progress} color="green" />
        </div>
      {:else}
        <Fileupload
          id="fileInput"
          class="mb-2"
          on:change={setFile}
          bind:this={fileInput}
          required
        />
        <Helper>PNG, JPEG, SVG or WEBP (MAX. 2MB).</Helper>
      {/if}
    </Card>
    <Card padding="sm">
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name1" class="mb-2">Username:</Label>
        <Input
          bind:value={$user.username}
          on:input={checkUsername}
          type="text"
          id="name"
          placeholder="example@gmail.com"
        />
        <Helper color={username_exist ? "red" : "green"}
          >{username_exist
            ? "The Username already exist"
            : "Use this username"}.</Helper
        >
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name1" class="mb-2">Name:</Label>
        <Input
          bind:value={$user.name}
          type="text"
          id="name"
          placeholder="example@gmail.com"
        />
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name" class="mb-2">About Me:</Label>
        <Textarea
          bind:value={$user.description}
          type="text"
          id="description"
          placeholder="Anything about you..."
        />
      </p>
    </Card>

    <Card padding="sm">
      <Label class="text-xl font-bold">Contacts :</Label>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="name1" class="mb-2">Email:</Label>
        <Input
          bind:value={$user.email}
          type="email"
          id="email"
          placeholder="example@gmail.com"
        />
      </p>
      <p class="mb-4 font-semibold text-gray-900 dark:text-white">
        <Label for="phone1" class="mb-2">Phone Number:</Label>
        <Input
          bind:value={$user.phone_number}
          type="text"
          id="phone"
          placeholder="+254 712345678"
        />
      </p>
    </Card>
  </div>
</div>
<div class="mb-6 block" />
{#if updating}
  <div>
    <Button class="w-full">
      <Spinner />Updating...
    </Button>
  </div>
{:else}
  <Button on:click={async () => await handleUpdate()} class="mr-2 w-full"
    >Update Account Data</Button
  >
{/if}

{#if updateSuccess}
  <p class="text-xl font-thin text-green-600">
    Your Account Data Is Updated Successfully
  </p>
{/if}
{#if updateError}
  <p class="text-xl font-thin text-red-600">{updateError}</p>
{/if}
