<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTopics } from "./api/client"

const topics = ref<any[]>([])
const error = ref("")

onMounted(async () => {
  try {
    topics.value = await getTopics()
  } catch (e: any) {
    error.value = e.message
  }
})
</script>

<template>
  <main class="container">
    <h1>TILT</h1>
    <p v-if="error">{{ error }}</p>
    <ul>
      <li v-for="t in topics" :key="t.id">
        {{ t.topic }} — 👍 {{ t.upCount }} 👎 {{ t.downCount }}
      </li>
    </ul>
  </main>
</template>

<style>
.container {
  max-width: 640px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
}
</style>
