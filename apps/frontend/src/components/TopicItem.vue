<script setup lang="ts">
import { vote, deleteTopic } from "../api/client"
import { computed } from "vue"

// Note: Ensure your API 'topic' object returns a field like 'userVote'
// that is 'up', 'down', or null, so the UI can highlight it.
const props = defineProps<{ topic: any }>()
const emit = defineEmits<{ (e: "updated"): void }>()

const up = async () => {
  if (props.topic.userVote === "up") return
  await vote(props.topic.id, "up")
  emit("updated")
}

const down = async () => {
  if (props.topic.userVote === "down") return
  await vote(props.topic.id, "down")
  emit("updated")
}


const del = async () => {
  if (!confirm("Delete this post?")) return
  await deleteTopic(props.topic.id)
  emit("updated")
}

const isUpvoted = computed(() => props.topic.userVote === "up")
const isDownvoted = computed(() => props.topic.userVote === "down")

</script>

<template>
  <article class="post-card">

    <div class="post-meta">
      <span class="author">Posted by u/ <span class="name">{{ topic.createdByName }}</span> </span>
    </div>


    <h2 class="post-title">{{ topic.topic }}</h2>


    <div class="action-bar">



      <div class="vote-pill" :class="{ 'voted-up': isUpvoted, 'voted-down': isDownvoted }">
        <button class="vote-btn up" @click="up">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4L4 12h5v8h6v-8h5z" />
          </svg>
        </button>


        <span class="score">{{ topic.upCount - topic.downCount }}</span>

        <button class="vote-btn down" @click="down">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 20l8-8h-5v-8h-6v8h-5z" />
          </svg>
        </button>
        <button v-if="topic.isOwner" class="delete-btn" @click="del" title="Delete Post">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          <span></span>
        </button>
      </div>



    </div>
  </article>
</template>

<style scoped>
.post-card {
  background: rgba(255, 255, 255, 0);
  border: 1px solid #cccccc64;
  /* Classic Reddit Border */
  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  /* Reddit style padding */
  transition: border-color 0.2s;
  border-radius: 10px;
}

.post-card:hover {
  border-color: #898989;
}

.post-meta {
  font-size: 12px;
  color: #cbdae2;
  margin-bottom: 8px;
  margin-top: 8px;
}

.author {
  font-weight: 400;
}

.author .name {
  font-weight: 700;
  color: rgb(86, 186, 116);
}


.post-title {
  font-size: 18px;
  margin: 0 0 12px 0;
  line-height: 22px;
  font-weight: 500;
  color: #ffffff;
}

.action-bar {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  color: #878a8c;
  font-weight: 700;
  font-size: 12px;
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: #878a8c;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: rgba(234, 0, 39, 0.1);
  color: #ea0027;
}

/* Vote Pill Design */
.vote-pill {
  display: flex;
  align-items: center;
  background-color: #f6f7f815;
  /* Pill background */
  border-radius: 999px;
  padding: 2px;
}

.vote-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #c6c9cb;
  display: flex;
  align-items: center;
  border-radius: 50%;
}

.score {
  min-width: 20px;
  text-align: center;
  color: #fafaff;
}

.vote-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Specific Highlight Colors */

.vote-btn.up:hover {
  color: #46d160;
  background-color: rgba(70, 209, 96, 0.1);
}

.vote-btn.down:hover {
  color: #ea0027;
  background-color: rgba(234, 0, 39, 0.1);
}

/* Active States (If user voted) */
.voted-up .vote-btn.up {
  color: #46d160;
}

.voted-up .score {
  color: #46d160;
}

.voted-down .vote-btn.down {
  color: #ea0027;
}

.voted-down .score {
  color: #ea0027;
}

/* Utility Buttons */
.utility-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
}

.utility-btn:hover {
  background-color: #f6f7f8;
}
</style>