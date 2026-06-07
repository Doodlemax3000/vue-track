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
    <div v-if="authStore.user" class="ml-auto flex items-center gap-4">
      <p>{{ authStore.user.email }}</p>
      <Button class="btn-neutral">Logout</Button>
    </div>
    <div v-else class="ml-auto flex items-center gap-4">
      <RouterLink to="/login">
        <Button class="btn-neutral">Login</Button>
      </RouterLink>
    </div>
  </div>
</template>
