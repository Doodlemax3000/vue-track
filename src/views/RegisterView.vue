<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FieldSet from '@/components/ui/FieldSet.vue'

import { ref } from 'vue'

import router from '@/router/index.ts'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const email2 = ref('')
const password = ref('')
const password2 = ref('')

const errorMsg = ref('')

async function register(event: Event) {
  event.preventDefault()
  if (
    email.value === '' ||
    password.value === '' ||
    email2.value === '' ||
    password2.value === ''
  ) {
    errorMsg.value = 'Please enter both email addresses and passwords'
    return
  }

  if (email.value !== email2.value) {
    errorMsg.value = 'Email addresses do not match'
    email.value = ''
    email2.value = ''
    return
  }

  if (password.value !== password2.value) {
    errorMsg.value = 'Passwords do not match'
    password.value = ''
    password2.value = ''
    return
  }

  try {
    await authStore.register(email.value, password.value)

    email.value = ''
    email2.value = ''
    password.value = ''
    password2.value = ''

    router.push('/dashboard')
  } catch (error) {
    errorMsg.value = 'Registration error: Invalid email or password'
    console.error('Registration error:', error)
  }
}
</script>

<template>
  <FieldSet class="mt-6" legend="Register">
    <label class="label">Email</label>
    <BaseInput v-model="email" type="email" placeholder="yourname@example.com" />

    <label class="label">Email Again</label>
    <BaseInput v-model="email2" type="email" placeholder="yourname@example.com" />

    <label class="label">Password</label>
    <BaseInput v-model="password" type="password" placeholder="Enter a password" />

    <label class="label">Password Again</label>
    <BaseInput v-model="password2" type="password" placeholder="Enter the password again" />

    <p v-if="errorMsg" class="text-red-400 mt-4">{{ errorMsg }}</p>

    <div class="flex gap-4 mt-4">
      <RouterLink to="/login">
        <Button>Login</Button>
      </RouterLink>
      <Button class="btn-neutral" @click="register">Register</Button>
    </div>
  </FieldSet>
</template>
