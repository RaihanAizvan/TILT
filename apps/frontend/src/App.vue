<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTopics, getMe } from "./api/client"

import TopBar from "./components/TopBar.vue"
import TopicCreate from "./components/TopicCreate.vue"
import TopicList from "./components/TopicList.vue"

const topics = ref<any[]>([])
const username = ref<string | null>(null)

const load = async () => {
  try {
    const me = await getMe()
    username.value = me.username
  } catch {
    username.value = null
  }
  topics.value = await getTopics()
}

onMounted(load)
</script>

<template>
  <div class="app-container">
    <TopBar :username="username" @updated="load" />
    <main class="feed">
      <TopicCreate @created="load" />
      <TopicList :topics="topics" @refresh="load" />
    </main>
  </div>
</template>

<style>
/* Global Resets & Variables */
body {
  margin: 0;
  padding: 0;
  background-color: #212121; /* chatgpt-ish Gray */
  color: #1a1a1b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
}

.feed {
  max-width: 640px;
  margin: 20px auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>