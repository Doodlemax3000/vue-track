<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FieldSet from '@/components/ui/FieldSet.vue'

import { ref } from 'vue'

import router from '@/router/index.ts'

const errorMsg = ref('')

function login(event: Event) {
  event.preventDefault()
  router.push('/login')
}

function register(event: Event) {
  event.preventDefault()
  errorMsg.value = 'Registering'
}
</script>

<template>
  <FieldSet class="mt-6" legend="Register">
    <label class="label">Email</label>
    <BaseInput type="email" placeholder="yourname@example.com" />

    <label class="label">Email Again</label>
    <BaseInput type="email" placeholder="yourname@example.com" />

    <label class="label">Password</label>
    <BaseInput type="password" placeholder="Enter a password" />

    <label class="label">Password Again</label>
    <BaseInput type="password" placeholder="Enter the password again" />

    <p v-if="errorMsg" class="text-red-400 mt-4">{{ errorMsg }}</p>

    <div class="flex gap-4 mt-4">
      <Button @click="login">Login</Button>
      <Button class="btn-neutral" @click="register">Register</Button>
    </div>
  </FieldSet>
</template>
