import axios from 'axios';

export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const usuarioAutenticado = store.getters.usuarioAutenticado;

    if (requiresAuth && !usuarioAutenticado) {
      next('/login');
    } else if ((to.path == '/login' || to.path == '/cadastro') && usuarioAutenticado) {
      next('/');
    } else {
      next();
    }
  });

  axios.interceptors.response.use(null, (error) => {
    if (error.resposne.status == 401) {
      store.commit('logout');
      router.push('/login');
    }

    return Promise.reject(error);
  });

  if (store.getters.usuarioAutenticado) {
    setAuthorization(store.getters.usuarioAutenticado.token);
  }
}

export function setAuthorization(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
