<script setup lang="ts">
import { ref } from 'vue'

type Option = {
  label: string
  value: string
}

const model = defineModel<string>()

defineProps<{
  options: Option[]
  placeholder?: string
}>()

const dropdown = ref<HTMLDetailsElement>()
const selectedLabel = ref('')

function select(option: Option) {
  model.value = option.value
  selectedLabel.value = option.label
  dropdown.value?.removeAttribute('open')
}
</script>

<template>
  <details ref="dropdown" class="dropdown w-full">
    <summary class="btn w-full justify-between">
      <span>{{ selectedLabel || placeholder || 'Select an option' }}</span>

      <svg
        class="size-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <ul class="dropdown-content menu z-10 mt-2 w-full rounded-box bg-base-200 p-2 shadow">
      <li v-for="option in options" :key="option.value">
        <button type="button" @click="select(option)">
          {{ option.label }}
        </button>
      </li>
    </ul>
  </details>
</template>
