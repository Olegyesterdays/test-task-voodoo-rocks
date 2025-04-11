<template>
  <div class="content">
    <h1>{{ $t('not-found.title')}}</h1>
    <h2>{{ $t('not-found.message')}}</h2>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 120px;
    margin: 0;
  }
}
</style>
