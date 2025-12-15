<script setup lang="ts">
import { vote, deleteTopic } from "../api/client"

const props = defineProps<{
  topic: any
}>()

const emit = defineEmits<{
  (e: "updated"): void
}>()

const up = async () => {
  await vote(props.topic.id, "up")
  emit("updated")
}

const down = async () => {
  await vote(props.topic.id, "down")
  emit("updated")
}

const del = async () => {
  await deleteTopic(props.topic.id)
  emit("updated")
}
</script>

<template>
  <li class="item">
    <div>
      <b>{{ topic.topic }}</b>
      <small>— {{ topic.createdByName }}</small>
    </div>
    <div class="actions">
      👍 {{ topic.upCount }}
      👎 {{ topic.downCount }}
      <button @click="up">Up</button>
      <button @click="down">Down</button>
      <button @click="del">Delete</button>
    </div>
  </li>
</template>
