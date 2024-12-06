<template>

  <div class="q-py-ms">

    <q-chip dense class="q-pa-sm text-caption " color="indigo-3" text-color="white" :icon="icon"
      style="position: absolute;     margin-top: -7px;z-index: 1;">{{ section }} </q-chip>
    <q-separator style="height: 2px; margin-top: 8px; position: relative;;" />

  </div>

  <div class="q-px-md q-pt-md q-pb-sm sidebar-width" style="max-width: 260px">
    <template v-for="menu in items" :key="menu.title">
      <q-expansion-item group="somegroup" :icon="menu.icon" :label="menu.title"
        class="overflow-hidden q-mb-none expansion-item inActive" style="border-radius: 7px">
        <template v-for="submenu in menu.subitems" :key="submenu.caption">
          <q-card>
            <q-card-section class="q-pa-none text-indigo-10 card-sec">
              <q-item :icon="submenu.icon" clickable :to="submenu.link" color="text-white">
                <q-item-section>
                  <q-item-label class="q-pl-md"><i :class="submenu.icon" class="q-pr-sm"></i>
                    {{ submenu.caption }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </template>
      </q-expansion-item>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  sidebarItems: {
    type: Array,
    // default: '',
  },
  section: {
    type: String,
    default: "",

  },
  title: {
    type: String,
    //  required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },

  items: {
    type: Array,
    // default: '',
  },
  subitems: {
    type: Array,
    // default: '',
  },
})

</script>

<style lang="scss" scoped>
.expansion-item {
  // border-bottom: 1px ridge rgb(42, 41, 41);
  font-family: "poppins", sans-serif;
  font-size: 14px;
}

.inActive {
  color: #1a237e;
}

.card-sec {
  background-color: #d7cef144;
  font-family: "poppins", sans-serif;
  font-size: 13px;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {

  .sidebar-width {
    width: 230px !important;
  }
}
</style>
