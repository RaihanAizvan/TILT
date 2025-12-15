<script setup lang="ts">
import TopicItem from "./TopicItem.vue"

defineProps<{ topics: any[] }>()
const emit = defineEmits<{ (e: "refresh"): void }>()
</script>

<template>
  <div class="list-container">
    <TopicItem
      v-for="t in topics"
      :key="t.id"
      :topic="t"
      @updated="emit('refresh')"
    />
  </div>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between cards */
}
</style>