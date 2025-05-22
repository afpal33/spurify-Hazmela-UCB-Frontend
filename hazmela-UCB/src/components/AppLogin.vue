<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 rounded-xl pa-8 dark-card">
          <div class="text-center mb-6">
            <v-avatar size="72" class="mx-auto mb-2" color="deep-purple-accent-4">
              <v-icon size="48" color="white">mdi-account</v-icon>
            </v-avatar>
            <div class="font-weight-bold text-h5 mb-1 text-white">Sign In</div>
            <div class="text-subtitle-2 text-grey-lighten-1">Access your account</div>
          </div>
          <v-form @submit.prevent="login" ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              :rules="emailRules"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              color="deep-purple-accent-4"
              required
              hide-details="auto"
              :style="{ background: 'rgba(40,40,60,0.8)', color: '#fff' }"
              input-class="input-dark"
            />
            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              :rules="passwordRules"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              color="deep-purple-accent-4"
              required
              hide-details="auto"
              :style="{ background: 'rgba(40,40,60,0.8)', color: '#fff' }"
              input-class="input-dark"
            />
            <div class="d-flex justify-end mb-4">
              <v-btn variant="text" color="deep-purple-accent-2" @click="forgotPassword" class="text-caption px-0">
                Forgot password?
              </v-btn>
            </div>
            <v-btn
              type="submit"
              color="deep-purple-accent-4"
              class="rounded-pill mb-2"
              block
              size="large"
              :disabled="!valid"
              elevation="2"
            >
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const valid = ref(false)
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters',
]

function login() {
  // Handle login logic here
  alert(`Logging in as ${email.value}`)
}

function forgotPassword() {
  // Handle forgot password logic here
  alert('Forgot password clicked')
}
</script>

<style scoped>
.dark-card {
  background: linear-gradient(135deg, #23243a 80%, #3a2c5a 100%);
  border-radius: 32px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  transition: box-shadow 0.2s;
}
.dark-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.28);
}
.input-dark input {
  color: #fff !important;
}
.input-dark label {
  color: #bdbdbd !important;
}
</style>
