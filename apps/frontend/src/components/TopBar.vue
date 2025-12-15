<script setup lang="ts">
import { ref, watch } from "vue"
import { setUsername } from "../api/client"

const props = defineProps<{ username: string | null }>()
const emit = defineEmits<{ (e: "updated"): void }>()

const name = ref(props.username ?? "")

watch(() => props.username, v => {
  if (v) name.value = v
})

const save = async () => {
  if (!name.value.trim()) return
  await setUsername(name.value)
  emit("updated")
}
</script>

<template>
  <header class="top-bar">
    <div class="inner">
      <div class="logo">
        <span class="logo-icon">T</span>
        <h1>TILT</h1>
      </div>
      
      <div class="user-control">
        <div class="input-group">
          <input
            v-model="name"
            placeholder="Set username..."
            @keydown.enter="save"
          />
        </div>
        <button @click="save" class="save-btn">&#128190;</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  background: rgb(29, 29, 29);
  color: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 30px;
}

.inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo-icon {
  background: #49c35d;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.save-btn {

  color: white;
  border: none;
  border-radius:10px;
  padding: 3px 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 2px;
}

.save-btn:hover {
  background-color: #05a300;
}

h1 {
  font-size: 20px;
  margin: 0;
  font-weight: 600;
}

.user-control {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  padding: 8px 16px;
  margin-left: 40px;
  border-radius: 99px;
  border: 1px solid #edeff14a;
  background: #f6f7f800;
  outline: none;
  font-size: 14px;
  width: 200px;
  transition: all 0.2s;
}

input:hover {
    background: rgba(250, 250, 250, 0.13);
  border-color: #ffffff6f;
}

input:focus {
  background: rgba(255, 255, 255, 0.165);
  border-color: #00d346;
  box-shadow: 0 0 0 2px rgba(0, 121, 211, 0.2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  position: absolute;
  right: 12px;
  pointer-events: none;
}

.status-dot.online {
  background: #46d160;
}
</style>