<script setup lang="ts">
import { ref } from "vue"
import { createTopic } from "../api/client"

const topic = ref("")
const emit = defineEmits<{ (e: "created"): void }>()

const submit = async () => {
  if (!topic.value.trim()) return
  await createTopic(topic.value)
  topic.value = ""
  emit("created")
}
</script>

<template>
  <div class="create-card">
    <div class="avatar"></div>
    <input
      v-model="topic"
      placeholder="What did you learn today?"
      @keydown.enter="submit"
    />
    

  </div>
</template>

<style scoped>
.create-card {
  background: rgba(255, 255, 255, 0);
  border-radius: 14px;
  border: 1px solid #cccccc80;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #68ff8e;
  flex-shrink: 0;
}

input {
  flex: 1;
  background: #5369801c;
  border: 1px solid #edeff120;
  border-radius: 14px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
}

input:hover {
  background: rgba(250, 250, 250, 0.13);
  border-color: #ffffff6f;
}

input:focus {
  background: rgba(255, 255, 255, 0.165);
  border-color: #00d346;
}
</style>