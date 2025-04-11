<template>
  <div class="post" @click="$emit('open', post.id)">
    <div class="content">
      <h4 class="author">
        {{ $t('posts-page.author') }}: {{ post.user?.name || $t('posts-page.unknown') }} ({{ post.user?.username || '' }})
      </h4>
      <h3 class="title-post">{{ post.title }}</h3>
      <p class="content-post">{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object
});
defineEmits(['open']);
</script>

<style scoped>
.post {
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--content-color);
  cursor: pointer;
}

.author {
  font-size: 14px;
  color: gray;
  margin-bottom: 8px;
}

.title-post {
  margin: 0;
}

.content-post {
  text-align: justify;
}
</style>
