<script setup lang="ts">
import FieldSet from '@/components/ui/FieldSet.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import Button from '@/components/ui/Button.vue'

import { ref } from 'vue'

import router from '@/router/index.ts'

const errorMsg = ref('')

function register(event: Event) {
  event.preventDefault()
  router.push('/register')
}

function login(event: Event) {
  event.preventDefault()
  errorMsg.value = 'Logging in'
}
</script>

<template>
  <FieldSet class="mt-6" legend="Login">
    <label class="label">Email</label>
    <BaseInput type="email" placeholder="yourname@example.com" />

    <label class="label">Password</label>
    <BaseInput type="password" placeholder="Enter a password" />

    <p v-if="errorMsg" class="text-red-400 mt-4">{{ errorMsg }}</p>

    <div class="flex gap-4 mt-4">
      <Button @click="register">Register</Button>
      <Button class="btn-neutral" @click="login">Login</Button>
    </div>
  </FieldSet>
</template>
