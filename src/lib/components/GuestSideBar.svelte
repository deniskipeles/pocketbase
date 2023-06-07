<script>
    let dropDownsData = [];
    let noDropDownsData = [
      {
        label: "Rooms",
        url: "/guest/rooms",
      },
      {
        label: "Amenities",
        url: "/guest/amenities",
      },
      {
        label: "Reservation",
        url: "/guest/reservations",
      },
      {
        label: "Reviews",
        url: "/reviews",
      },
      {
        label: "Services",
        url: "/guest/services",
      },
    ];
  
    import {
      Sidebar,
      SidebarDropdownWrapper,
      SidebarGroup,
      SidebarItem,
      SidebarWrapper,
    } from "flowbite-svelte";
  
    export let activeUrl;
    export let spanClass;
    export let toggleSide;
  </script>
  
  <Sidebar asideClass="w-54">
    <SidebarWrapper>
      {#each noDropDownsData as { label, url }}
        <SidebarGroup>
          <SidebarItem
            href={url}
            {label}
            {spanClass}
            on:click={toggleSide}
            active={activeUrl === `${url}`}
          />
        </SidebarGroup>
      {/each}
  
      {#each dropDownsData as { title, children }}
        <SidebarGroup class="pt-4">
          <SidebarDropdownWrapper
            label={title.toUpperCase()}
            isOpen={activeUrl.includes(title)}
          >
            {#each children as { url, name }}
              <SidebarItem
                label={name}
                href={url}
                {spanClass}
                on:click={toggleSide}
                active={activeUrl === `${url}`}
              />
            {/each}
          </SidebarDropdownWrapper>
        </SidebarGroup>
      {/each}
    </SidebarWrapper>
  </Sidebar>
  