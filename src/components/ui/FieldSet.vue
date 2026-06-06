<template>
  <fieldset
    class="fieldset bg-base-200 border-base-300 rounded-2xl w-full border p-4 max-w-lg mx-auto"
  >
    <legend v-if="props.legend" class="fieldset-legend">{{ props.legend }}</legend>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
const props = defineProps({
  legend: {
    type: String,
    required: false,
  },
})
</script>
