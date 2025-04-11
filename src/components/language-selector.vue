<template>
  <div>
    <select class="locale-selector" v-model="selectedLocale">
      <option v-for="lang in locales" :key="lang" :value="lang">
        {{ lang.toUpperCase() }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, messages } = useI18n();

// Инициализируем локально выбранную локаль текущим значением глобальной локали
const selectedLocale = ref(locale.value);

// Вычисляем список доступных языков (ключи объекта messages)
const locales = computed(() => Object.keys(messages.value));

// Следим за изменением выбранной локали и обновляем текущую локаль в i18n
watch(selectedLocale, (newLocale) => {
  locale.value = newLocale;
});
</script>

<style lang="scss" scoped>
.locale-selector {
  padding: 4px;
}
</style>
