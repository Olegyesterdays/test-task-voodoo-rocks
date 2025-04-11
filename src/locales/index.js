import { createI18n } from 'vue-i18n';

const messages = {};
const modules = import.meta.glob('./languages/*.json', { eager: true });

for (const path in modules) {
  const locale = path.match(/\/(\w+)\.json$/)[1];
  messages[locale] = modules[path].default;
}

const browserLocale = navigator.language.split('-')[0];

const locale = messages[browserLocale] ? browserLocale : 'en';

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages
});
