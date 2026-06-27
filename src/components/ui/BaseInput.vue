<template>
  <input v-model="model" v-bind="$attrs" class="input mb-2 w-full rounded-xl md:max-w-lg" />
</template>
<script setup lang="ts">
const model = defineModel<string>()
</script>
