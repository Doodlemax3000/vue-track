import { defineStore } from 'pinia'

import { auth } from '@/services/firebase'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        console.error('Logout error:', error)
        throw error
      }
    },
    initialize() {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user
          this.loading = false
          resolve()
        })
      })
    },
  },
})
