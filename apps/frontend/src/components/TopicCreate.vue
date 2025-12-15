<script setup lang="ts">
import { ref } from "vue"
import { createTopic } from "../api/client"

const topic = ref("")
const emit = defineEmits<{
  (e: "created"): void
}>()

const submit = async () => {
  if (!topic.value.trim()) return
  await createTopic(topic.value)
  topic.value = ""
  emit("created")
}
</script>

<template>
  <div class="card">
    <input v-model="topic" placeholder="Ask something…" />
    <button @click="submit">Post</button>
  </div>
</template>
