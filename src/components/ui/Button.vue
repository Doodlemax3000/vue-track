<template>
  <button :disabled="disabled" :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => [
  // Base styles
  'inline-flex items-center justify-center',
  'rounded-xl px-4 py-2.5',
  'font-medium',
  'transition-all duration-200',
  'select-none',
  'focus:outline-none focus:ring-2 focus:ring-zinc-500',
  'disabled:pointer-events-none disabled:opacity-50',

  // Variants
  {
    // Main CTA
    'bg-zinc-100 text-zinc-950 hover:bg-zinc-300 active:scale-[0.98]': props.variant === 'primary',

    // Secondary action
    'border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 active:scale-[0.98]':
      props.variant === 'secondary',

    // Very subtle
    'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100': props.variant === 'ghost',
  },
])
</script>
