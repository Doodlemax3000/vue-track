<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FormField from '@/components/ui/FormField.vue'

import { ref } from 'vue'

const errorMsg = ref('')

function register(event: Event) {
  event.preventDefault()
  errorMsg.value = ''
}

function login(event: Event) {
  event.preventDefault()
  errorMsg.value = 'Error: something went wrong'
}
</script>

<template>
  <h1 class="text-3xl">Login</h1>
  <Card>
    <form class="space-y-4">
      <FormField label="Email" for="email">
        <BaseInput id="email" type="email" placeholder="yourname@example.com" />
      </FormField>

      <FormField label="Password" for="password">
        <BaseInput id="password" type="password" placeholder="Enter a password" />
      </FormField>

      <div>
        <p class="text-red-400">{{ errorMsg }}</p>
      </div>

      <div class="flex gap-4 mt-6">
        <Button variant="secondary" class="mx-auto w-full" @click="register">Register</Button>
        <Button variant="primary" class="mx-auto w-full" @click="login">Login</Button>
      </div>
    </form>
  </Card>
</template>
