<template>
  <div>
    <label :for="id" class="mb-1 block text-zinc-400">
      {{ label }}
    </label>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  id: String,
})
</script>
