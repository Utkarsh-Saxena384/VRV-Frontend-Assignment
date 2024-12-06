<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue';


</script>

<style>
body {
  background-color: #fafafa;
}
</style>
