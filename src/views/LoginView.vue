<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import FormField from '@/components/ui/FormField.vue'

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
  <h1 class="text-3xl">Login</h1>

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-2xl w-full border p-4">
    <legend class="fieldset-legend">Login</legend>

    <label class="label">Email</label>
    <input type="email" class="input w-full md:max-w-lg" placeholder="yourname@example.com" />

    <label class="label">Password</label>
    <input type="password" class="input w-full md:max-w-lg" placeholder="Enter a password" />

    <div class="flex gap-4">
      <button class="btn rounded-xl mt-4" @click="register">Register</button>
      <button class="btn rounded-xl btn-neutral mt-4" @click="login">Login</button>
    </div>
  </fieldset>
  <!--
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
    </form>-->
</template>
