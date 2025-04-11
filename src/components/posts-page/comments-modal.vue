<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <h3>Комментарии для поста #{{ postId }}</h3>

      <div v-if="loading" class="loading">
        Загрузка комментариев...
      </div>
      <div v-else-if="!comments.length" class="no-comments">
        Комментариев нет.
      </div>
      <div v-else class="comments-list">
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <h4 class="comment-title">{{ comment.name }}</h4>
          <p class="comment-email">{{ comment.email }}</p>
          <p class="comment-body">{{ comment.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/services/api.js';

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
});
const emit = defineEmits(['close']);

const comments = ref([]);
const loading = ref(false);

const fetchComments = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/comments?postId=${props.postId}`);
    comments.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchComments();
});

// Если postId может измениться, обновим комментарии
watch(() => props.postId, (newId, oldId) => {
  if (newId !== oldId) {
    fetchComments();
  }
});

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* затемнение */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.comment {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.comment-title {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.comment-email {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}

.comment-body {
  font-size: 14px;
  color: #444;
}
</style>
