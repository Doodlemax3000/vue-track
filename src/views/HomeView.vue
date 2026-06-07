<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <h1 class="text-4xl font-bold text-center mt-6">Welcome to MyTrack!</h1>
  <p class="text-center text-lg mt-4 max-w-lg mx-auto">
    This is the home page of your personal tracking app. If you want to use the app, please login or
    register.
  </p>
  <div class="flex items-center justify-center gap-4 mt-6 flex-col">
    <p class="font-mono text-secondary">Go to your Dashboard now!</p>
    <RouterLink to="/dashboard">
      <Button class="btn-neutral">Dashboard</Button>
    </RouterLink>
  </div>
</template>
