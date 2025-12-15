<script setup lang="ts">
import { ref } from "vue"
import { setUsername } from "../api/client"

const username = ref("")
const error = ref("")

const emit = defineEmits<{
  (e: "saved"): void
}>()

const submit = async () => {
  if (!username.value.trim()) {
    error.value = "Username required"
    return
  }
  await setUsername(username.value)
  emit("saved")
}
</script>

<template>
  <div class="card">
    <h2>Enter your name</h2>
    <input v-model="username" placeholder="Your name" />
    <button @click="submit">Continue</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  border-radius: 12px;
  background: #111;
  color: #fff;
}
input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
}
button {
  padding: 8px 16px;
}
</style>
