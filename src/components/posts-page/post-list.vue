<template>
  <div class="posts">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @open="handleOpen"
    />
  </div>
</template>

<script setup>
import PostCard from './post-card.vue';

defineProps({
  posts: Array
});

const emit = defineEmits(['openPost']);

const handleOpen = (postId) => {
  emit('openPost', postId);
};
</script>

<style scoped>
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  align-items: start;
}
</style>
