<script setup lang="ts">
import FieldSet from '@/components/ui/FieldSet.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import Button from '@/components/ui/Button.vue'

import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const errorMsg = ref('')

async function login(event: Event) {
  event.preventDefault()
  if (email.value === '' || password.value === '') {
    errorMsg.value = 'Please enter both email and password'
    return
  }

  try {
    await authStore.login(email.value, password.value)

    email.value = ''
    password.value = ''

    router.push('/dashboard')
  } catch (error) {
    errorMsg.value = 'Login error: Invalid email or password'
    console.error('Login error:', error)
  }
}
</script>

<template>
  <FieldSet class="mt-6" legend="Login">
    <label class="label">Email</label>
    <BaseInput v-model="email" type="email" placeholder="yourname@example.com" />

    <label class="label">Password</label>
    <BaseInput v-model="password" type="password" placeholder="Enter a password" />

    <p v-if="errorMsg" class="text-red-400 mt-4">{{ errorMsg }}</p>

    <div class="flex gap-4 mt-4">
      <RouterLink to="/register">
        <Button>Register</Button>
      </RouterLink>
      <Button class="btn-neutral" @click="login">Login</Button>
    </div>
  </FieldSet>
</template>
