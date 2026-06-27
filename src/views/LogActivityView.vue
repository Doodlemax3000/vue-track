<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getCalendarDaysFromTodayNoGaps } from '@/services/dayService'
import type { CalendarDay } from '@/services/dayService'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="my-4 flex items-center gap-4">
    <p>Log New Activity</p>
  </div>
  <div>
    <RouterLink to="/dashboard">
      <Button class="btn-neutral">Dashboard</Button>
    </RouterLink>
  </div>
</template>
