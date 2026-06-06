<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <div class="mx-auto w-full px-4 py-6 sm:px-6 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
      <Navbar />
      <RouterView> </RouterView>
    </div>
  </main>
</template>

<style scoped></style>
