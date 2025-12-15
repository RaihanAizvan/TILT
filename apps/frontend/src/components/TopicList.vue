<script setup lang="ts">
import TopicItem from "./TopicItem.vue"

defineProps<{
  topics: any[]
}>()

const emit = defineEmits<{
  (e: "refresh"): void
}>()
</script>

<template>
  <ul>
    <TopicItem
      v-for="t in topics"
      :key="t.id"
      :topic="t"
      @updated="emit('refresh')"
    />
  </ul>
</template>
