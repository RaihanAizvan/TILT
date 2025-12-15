<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTopics, getMe } from "./api/client"

import UsernamePrompt from "./components/UsernamePrompt.vue"
import TopicCreate from "./components/TopicCreate.vue"
import TopicList from "./components/TopicList.vue"

const topics = ref<any[]>([])
const hasUsername = ref(false)
const loading = ref(true)

const load = async () => {
  loading.value = true
  try {
    await getMe()              // 🔑 single source of truth
    hasUsername.value = true
    topics.value = await getTopics()
  } catch {
    hasUsername.value = false
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <main class="container">
    <h1>TILT</h1>

    <p v-if="loading">Loading…</p>

    <UsernamePrompt
      v-else-if="!hasUsername"
      @saved="load"
    />

    <template v-else>
      <TopicCreate @created="load" />
      <TopicList :topics="topics" @refresh="load" />
    </template>
  </main>
</template>
