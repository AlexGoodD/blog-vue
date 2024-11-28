<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
</style>
