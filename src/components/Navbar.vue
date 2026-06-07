<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <RouterLink to="/">
      <h1 class="text-3xl">MyTrack</h1>
    </RouterLink>
    <p class="ml-auto">
      {{ authStore.user ? authStore.user.email : 'not logged in' }}
    </p>
    <Button class="btn-neutral">Logout</Button>
  </div>
</template>
