<template>
  <div class="posts-wrapper">
    <div class="header">
      <PostFilter @update:filter="selectedUsername = $event" />
      <LanguageSelector />
    </div>
    <PostList :posts="filteredPosts" @openPost="openComments" />
    <CommentsModal v-if="selectedPostId" :postId="selectedPostId" @close="closeComments" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import PostFilter from '@/components/posts-page/post-filter.vue';
import PostList from '@/components/posts-page/post-list.vue';
import CommentsModal from '@/components/posts-page/comments-modal.vue';
import LanguageSelector from '@/components/language-selector.vue';

const store = useStore();
const posts = computed(() => store.getters['post-module/getAllPosts']);
const selectedUsername = ref('');
const selectedPostId = ref(null);

const filteredPosts = computed(() => {
  if (!selectedUsername.value) return posts.value;
  return posts.value.filter(post => post.user?.username.toLowerCase().includes(selectedUsername.value));
});

const openComments = postId => {
  selectedPostId.value = postId;
};

const closeComments = () => {
  selectedPostId.value = null;
};

onMounted(() => {
  store.dispatch('post-module/getPost');
});
</script>


<style lang="scss" scoped>
.posts-wrapper {
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 24px;
  }
}
</style>