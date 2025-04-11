<template>
  <div class="filter">
    <input
      id="username-input"
      type="text"
      v-model="username"
      :placeholder="$t('posts-page.name-search')"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:filter']);
const username = ref('');

// Следим за изменениями и передаём родителю
watch(username, (val) => {
  emit('update:filter', val.trim().toLowerCase());
});
</script>

<style scoped>
.filter {
  margin-bottom: 20px;

  label {
    margin-right: 8px;
  }

  input {
    padding: 4px 8px;
    font-size: 14px;
  }
}
</style>
