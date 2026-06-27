<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FieldSet from '@/components/ui/FieldSet.vue'
import BaseDropdownSelect from '@/components/ui/BaseDropdownSelect.vue'

import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const activityType = ref('running')

const activityOptions = [
  { label: 'Running', value: 'running' },
  { label: 'Gym', value: 'gym' },
  { label: 'Study', value: 'study' },
]

const errorMsg = ref('')
</script>

<template>
  <div class="my-4 flex items-center gap-4">
    <p>Log New Activity</p>
  </div>

  <FieldSet class="mt-6" legend="Log Activity">
    <label class="label">Date</label>
    <BaseInput type="date" class="input" />

    <label class="label">Activity</label>
    <BaseDropdownSelect
      v-model="activityType"
      :options="activityOptions"
      placeholder="Choose activity"
    />

    <p>Selected Activity: {{ activityType }}</p>

    <p v-if="errorMsg" class="text-red-400 mt-4">{{ errorMsg }}</p>

    <div class="flex gap-4 mt-4">
      <RouterLink to="/dashboard">
        <Button>Cancel</Button>
      </RouterLink>
      <Button class="btn-neutral" @click="">Log Activity</Button>
    </div>
  </FieldSet>
</template>
