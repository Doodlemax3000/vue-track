<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getCalendarDaysFromTodayNoGaps } from '@/services/dayService'
import type { CalendarDay } from '@/services/dayService'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
const calendarDays = ref<CalendarDay[]>([])

onMounted(async () => {
  try {
    const user = authStore.user
    if (!user) return

    calendarDays.value = await getCalendarDaysFromTodayNoGaps(user.uid, 14)
  } catch (error) {
    console.error('Dashboard load failed:', error)
  }
})

function getMondayFirstWeekdayIndex(dateId: string) {
  const date = new Date(`${dateId}T00:00:00`)
  const day = date.getDay()
  // JS: Sunday = 0, Monday = 1, ..., Saturday = 6
  // We want: Monday = 0, ..., Sunday = 6
  return day === 0 ? 6 : day - 1
}

const leadingEmptyDays = computed(() => {
  const firstDay = calendarDays.value[0]
  return firstDay ? getMondayFirstWeekdayIndex(firstDay.date) : 0
})
</script>

<template>
  <p>This is your personal dashboard.</p>
  <div class="mt-4 flex items-center gap-4">
    <Button class="btn btn-neutral" onclick="log_activity_modal.showModal()">Log Activity</Button>
    <dialog id="log_activity_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Log Activity</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <Button class="btn-neutral mr-2">Cancel</Button>
            <Button class="btn btn-primary">Log</Button>
          </form>
        </div>
      </div>
    </dialog>
  </div>

  <div class="grid grid-cols-7 gap-3 text-center text-xs text-zinc-500 mt-6">
    <span>Mon</span>
    <span>Tue</span>
    <span>Wed</span>
    <span>Thu</span>
    <span>Fri</span>
    <span>Sat</span>
    <span>Sun</span>

    <div v-for="n in leadingEmptyDays" :key="`empty-${n}`" />

    <button v-for="day in calendarDays" :key="day.date" class="flex flex-col items-center gap-1">
      <span class="size-10 rounded-full" :class="day.color" />

      <span class="text-xs text-zinc-400">
        {{ day.date.slice(8, 10) }}
      </span>
    </button>
  </div>
</template>
