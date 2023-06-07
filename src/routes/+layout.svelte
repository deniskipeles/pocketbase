<script lang="ts">
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import { afterNavigate, invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    CloseButton,
    DarkMode,
    Drawer,
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import "../app.postcss";
  import { pb } from "$lib/pocketbase";
  import GuestSideBar from "$lib/components/GuestSideBar.svelte";

  export let data;
  let width: number;
  let breakPoint: number = 1024;
  let drawerHidden: boolean = false;
  let activateClickOutside: boolean = true;
  onMount(() => {
    if (width >= breakPoint) {
      drawerHidden = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      activateClickOutside = true;
    }
  });
  $: if (width >= breakPoint) {
    drawerHidden = false;
    activateClickOutside = false;
  } else {
    drawerHidden = true;
    activateClickOutside = true;
  }
  const toggleDrawer = () => {
    drawerHidden = false;
  };
  const toggleSide = () => {
    if (width < breakPoint) {
      drawerHidden = !drawerHidden;
    }
  };
  let main: HTMLElement;
  afterNavigate(() => {
    // this fixes https://github.com/themesberg/flowbite-svelte/issues/364
    main.scrollIntoView();
  });

  $: activeUrl = $page.url.pathname;

  let spanClass =
    "pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white";
  let darkModeClass = "text-lg";
  let divClass = "w-full md:block md:w-auto pr-8 order-1 md:order-none";
  let ulClass =
    "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium";
  let backdrop: boolean = false;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  $: ({ user, hostel } = data);
  $: site_name = hostel?.name;
  $: logo =
    (hostel?.logo
      ? pb.files.getUrl(hostel, hostel?.logo, { thumb: "250x250" })
      : null) ?? "/images/img7.png";
  $: keds = {
    github: "https://chat.whatsapp.com/J94f3Jvma2rAjsmG2CCXXM",
    discord: "https://discord.gg/cArvwxjYV4",
    qbits: "https://discord.gg/cArvwxjYV4",
    twitter: "https://twitter.com/KipelesKemboi",
  };

  // onMount(() => {
  //   const { data } = supabase.auth.onAuthStateChange(() => {
  //     invalidate("supabase:auth");
  //   });

  //   return () => data.subscription.unsubscribe();
  // });
</script>

<svelte:window bind:innerWidth={width} />

<div class="mx-auto dark:bg-slate-900">
  <Navbar
    navClass="px-2 py-0.5 fixed w-full mx-auto z-20 top-0 left-0 border-b"
    let:hidden
    let:toggle
  >
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/">
      <img src={logo} class="mr-3 h-6 sm:h-9" alt="Logo" />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        {site_name}
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
      <NavLi href="/" on:click={toggle}>Home</NavLi>
      <NavLi href="/contacts" on:click={toggle}>Contacts</NavLi>
      <NavLi href="/about-us" on:click={toggle}>About Us</NavLi>
      <NavLi
        href={user?.user_metadata ? `/account` : `/login`}
        on:click={toggle}>{user?.username ?? user?.email ?? "login"}</NavLi
      >
    </NavUl>
    <DarkMode class={darkModeClass} />
  </Navbar>
  <Drawer
    transitionType="fly"
    {backdrop}
    {transitionParams}
    bind:hidden={drawerHidden}
    bind:activateClickOutside
    leftOffset="lg:top-16 h-screen lg:left-0"
    id="sidebar"
    width="w-64"
    class="overflow-scroll pb-32"
  >
    <div class="flex items-center">
      <CloseButton
        on:click={() => (drawerHidden = true)}
        class="mb-4 dark:text-white lg:hidden"
      />
    </div>

    <SidebarWrapper>
      {#if user && !user?.super_user}
        <GuestSideBar {activeUrl} {spanClass} {toggleSide} />
      {/if}
      {#if user}
        <SidebarGroup>
          <SidebarItem
            href={`/account`}
            label={`My Account`}
            {spanClass}
            on:click={toggleSide}
            active={activeUrl === `/account`}
          />
        </SidebarGroup>
        <SidebarGroup>
          <span class={spanClass}>
            <form method="POST" action="/logout">
              <button type="submit">logout<button /></button>
            </form>
          </span>
        </SidebarGroup>
      {:else}
        <SidebarGroup>
          <SidebarItem
            href={`/login`}
            label={`Login`}
            {spanClass}
            on:click={toggleSide}
            active={activeUrl === `/login`}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem
            href={`/register`}
            label={`Register`}
            {spanClass}
            on:click={toggleSide}
            active={activeUrl === `/register`}
          />
        </SidebarGroup>
      {/if}
    </SidebarWrapper>
  </Drawer>

  <div class="bg-white dark:bg-slate-900 flex px-4 mx-auto w-full">
    <main bind:this={main} class="lg:ml-72 w-full mx-auto">
      <slot />
    </main>
  </div>
  <div class="dark:bg-slate-900 mx-auto mb-4 pt-4 lg:pl-64">
    <Footer
      footerType="custom"
      customClass="py-6 px-16 bg-white dark:bg-gray-900"
    >
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <FooterBrand href="/" src={logo} alt={site_name} name={site_name} />
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
            >
              Resources
            </h2>
            <FooterLinkGroup>
              <FooterLink liClass="mb-4" href="/public/questions"
                >Test</FooterLink
              >
              <FooterLink liClass="mb-4" href="/public/notes">Notes</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <h2
              class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
            >
              Follow us
            </h2>
            <FooterLinkGroup>
              <FooterLink liClass="mb-4" href={keds?.github}>GitHub</FooterLink>
              <FooterLink liClass="mb-4" href={keds?.discord}
                >Discord</FooterLink
              >
            </FooterLinkGroup>
          </div>
          <div>
            <h2
              class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
            >
              Legal
            </h2>
            <FooterLinkGroup>
              <FooterLink
                liClass="mb-4"
                href="https://github.com/themesberg/flowbite-svelte/blob/main/LICENSE"
                >License</FooterLink
              >
            </FooterLinkGroup>
          </div>
        </div>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="sm:flex sm:items-center sm:justify-between">
        <FooterCopyright href={keds?.qbits} by="qbits™" />
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <FooterIcon
            hreflocals="https://deniskipeles.github.io"
            class="text-gray-400 hover:text-gray-900"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              ><path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              /></svg
            >
          </FooterIcon>
        </div>
      </div>
    </Footer>
  </div>
</div>

<svelte:head>
  <title>{hostel?.name}</title>
  <meta name="description" content={hostel?.description} />
  <link rel="apple-touch-icon" sizes="76x76" href={logo} />
  <link rel="icon" type="image/svg+xml" href={logo} />
  <link rel="icon" type="image/png" href={logo} />
</svelte:head>
