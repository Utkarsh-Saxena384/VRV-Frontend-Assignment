<template>
  <div>
    <!-- navbar  -->
    <q-header class="header-nav" style="box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1)"
      :class="$q.dark.isActive ? 'bg-secondary' : 'bg-white'">
      <q-toolbar style="min-height: 60px">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="icon-color drawer-icon" size="1rem" />
      </q-toolbar>
    </q-header>
    <!-- navbar  -->

    <!-- sidebar  -->
    <q-drawer v-model="drawer" show-if-above :breakpoint="300" :width="260" bordered
      class="sideBar-color sidebar-width">
      <div class="absolute-top" style="height: 55px">
        <div class="q-pa-sm">
          <q-input dense @keyup="searchFilter" v-model="search" outlined rounded type="search"
            placeholder="search here...">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div v-if="showDropdown" class="sidebarSearchDropdown sidebar-width">
          <template v-for="item in searchSidebar" :key="item.caption">
            <q-card>
              <q-card-section class="q-pa-none text-indigo-10 card-sec">
                <q-item :icon="item.icon" clickable :to="item.link" color="text-white">
                  <q-item-section>
                    <q-item-label class="q-pl-lg"><i :class="item.icon" class="q-pr-sm"></i>
                      {{ item.caption }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </template>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 55px); margin-top: 55px; " class="sidebar-width">
        <q-list>
          <NavBarElement v-for="item in sidebarItems" :key="item.items" v-bind="item" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBarElement from "src/components/NavBarElement.vue";
const router = useRouter();

const drawer = ref(false);

const showDropdown = ref(false);
const search = ref("");

let sidebarItems = [
  {
    section: "Settings",
    icon: "settings",
    items: [
      {
        title: "User Access Manager",
        icon: "lock",
        subitems: [
          {
            caption: "Manage Users",
            icon: "fas fa-caret-right",
            link: "/manage-users",
          },
          {
            caption: "Manage Permissions",
            icon: "fas fa-caret-right",
            link: "/manage-permissions",
          },
        ],
      },
    ],
  },
];

let searchSidebar = []
const searchFilter = () => {
  searchSidebar.length = 0
  const searchField = search.value.toLocaleLowerCase()

  sidebarItems.forEach((obj) => {
    obj.items.forEach((item) => {
      item.subitems.forEach((subItem) => {
        if (subItem.caption.toLocaleLowerCase().indexOf(searchField) != -1) {
          if (searchSidebar.includes(subItem)) {
            return false
          } else {
            if (searchField.length >= 1) {
              searchSidebar.push(subItem)
              showDropdown.value = true
            }
            else {
              searchSidebar.length = 0
              showDropdown.value = false
            }
          }
        }
      })
    })
  })
}

const drawerClick = (e) => {
  drawer.value = false
};
</script>

<style lang="scss">
.q-item__section--side>.q-icon {
  font-size: 20px;
  color: #2858f7;
}

.q-item__section--avatar {
  min-width: 40px;
}

.mini-icons {
  padding: 10px;
  margin-left: 5px;
  color: #2858f7;
}

.d-icon {
  padding: 10px;
  padding-right: 13px;
  background-color: #fff;
  width: fit-content;
}


.mainHead {
  // width: 250px;
  // height: 52px;
  font-size: 20px;
}

.hr-1 {
  margin-top: 2px;
  background: #8a8383;
}

.icon-color {
  color: #2858f7;
}

.drawer-icon {
  margin-left: -10px;
}

.sideBar-color {
  background-color: #fff;
}

.img-pos {
  padding-top: 7px;
  padding-right: 5px;
  padding: 7px;
  opacity: 1;
}

.dt-logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  height: 60px;
  // position: sticky !important ;
}

#dt-text {
  font-size: 21px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  padding-left: 5px;
  text-decoration: none;
  color: #d219b9;
}

.wel-head {
  margin-left: 10px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}

.log-btn {
  width: 100%;
  text-transform: capitalize;
  font-size: 11px;
  height: 40px;
  size: 12px;
  display: flex;
  align-items: flex-start;
}

.icon-pos {
  width: auto;
}

.q-icon {
  width: auto;
}

.q-item {
  min-height: 40px;
  padding: 10px 10px;
}

.icon-search {
  font-size: 2rem;
}

.sidebarSearchDropdown {
  position: absolute;
  z-index: 1;
  width: 100%;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {

  .dt-logo {
    padding: 5px;
    height: 50px;
  }

  .q-field__control {

    height: 35px;
    max-width: 90%;

  }

  .text-caption {
    font-size: 0.6rem;
  }

  .expansion-item[data-v-7f991a28] {
    font-size: 13px;
  }

  .card-sec[data-v-7f991a28] {

    font-size: 12px;
  }

  .q-item {
    min-height: 31px;
    // padding: 10px 8px;

  }

  .sidebar-width {
    //  width: 230px !important;
    padding-right: 0px;
  }

  .q-drawer--left {
    width: 260px !important;
  }

  // .q-page-container {
  //   padding-left: 235px !important;
  // }

  .q-drawer--mini {
    width: 55px !important;

    .sidebar-width {
      width: 50px !important;
    }

    .q-page-container {
      padding-left: 180px !important;
    }

    .q-pa-md {
      padding: 16px 5px;
    }
  }
}
</style>
