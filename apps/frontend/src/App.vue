<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTopics } from "./api/client"

import UsernamePrompt from "./components/UsernamePrompt.vue"
import TopicCreate from "./components/TopicCreate.vue"
import TopicList from "./components/TopicList.vue"

const topics = ref<any[]>([])
const hasUsername = ref(true)

const load = async () => {
  try {
    topics.value = await getTopics()
    hasUsername.value = true
  } catch {
    hasUsername.value = false
  }
}

onMounted(load)
</script>

<template>
  <main class="container">
    <h1>TILT</h1>

    <UsernamePrompt v-if="!hasUsername" @saved="load" />

    <template v-else>
      <TopicCreate @created="load" />
      <TopicList :topics="topics" @refresh="load" />
    </template>
  </main>
</template>
