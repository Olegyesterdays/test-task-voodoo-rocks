// Функция для проверки авторизации
const isAuth = () => {
  return true;
};

// Функция для проверки роли
const isRole = () => {
  return true;
};

export const restrictRoute = router => {
  router.beforeEach((to, from, next) => {
    const authenticated = isAuth();
    const role = isRole();

    if (!authenticated && to.meta.requiresAuth) {
      next('/auth');
    } else if (authenticated && to.name === 'auth') {
      next('/');
    } else if (to.meta.requiresAuth && !role) {
      next('/not-found');
    } else {
      next();
    }
  });
};
