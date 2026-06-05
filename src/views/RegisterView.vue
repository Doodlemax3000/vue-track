<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FormField from '@/components/ui/FormField.vue'

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
  <h1 class="text-3xl">Register</h1>
  <Card>
    <form class="space-y-4">
      <FormField label="Email" for="email">
        <BaseInput id="email" type="email" placeholder="yourname@example.com" />
      </FormField>

      <FormField label="Email Again" for="email2">
        <BaseInput id="email2" type="email" placeholder="yourname@example.com" />
      </FormField>

      <FormField label="Password" for="password">
        <BaseInput id="password" type="password" placeholder="Enter a password" />
      </FormField>

      <FormField label="Password Again" for="password2">
        <BaseInput id="password2" type="password" placeholder="Enter the password again" />
      </FormField>

      <div>
        <p class="text-red-400">{{ errorMsg }}</p>
      </div>

      <div class="flex gap-4 mt-6">
        <Button variant="secondary" class="mx-auto w-full" @click="login">Login</Button>
        <Button variant="primary" class="mx-auto w-full" @click="register">Register</Button>
      </div>
    </form>
  </Card>
</template>
