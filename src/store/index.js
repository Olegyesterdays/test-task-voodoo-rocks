import { createStore } from 'vuex';

const modules = {};
const moduleStore = import.meta.glob('./modules/*.js', { eager: true });

for (const path in moduleStore) {
  const match = path.match(/\/([a-zA-Z0-9-_]+)\.js$/);
  if (match && match[1]) {
    const moduleName = match[1];
    modules[moduleName] = moduleStore[path].default;
  } else {
    console.warn(`Не удалось извлечь имя модуля из пути: ${path}`);
  }
}

const store = createStore({
  modules
});

export default store;
