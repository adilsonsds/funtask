import axios from 'axios';
import {
  ObterUsuario
} from "@/services/AuthService";

const usuario = ObterUsuario();

export default {
  state: {
    usuarioAutenticado: usuario,
    estaLogado: !!usuario,
    loading: false,
    auth_error: null
  },
  getters: {
    usuarioAutenticado(state) {
      return state.usuarioAutenticado;
    },
    estaLogado(state) {
      return state.estaLogado;
    },
    loading(state) {
      return state.loading;
    },
    authError(state) {
      return state.auth_error;
    },
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loginSuccess(state, dados) {
      state.auth_error = null;
      state.estaLogado = true;
      state.loading = false;
      state.usuarioAutenticado = Object.assign({}, dados.usuario, {
        token: dados.token
      });

      localStorage.setItem('user', JSON.stringify(state.usuarioAutenticado));

      axios.defaults.headers.common['Authorization'] = `Bearer ${dados.token}`;
    },
    loginFailed(state, dados) {
      state.loading = false;
      state.auth_error = dados.error;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.estaLogado = false;
      state.auth_error = null;
      state.usuarioAutenticado = null;

      delete axios.defaults.headers.common["Authorization"];
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    }
  }
}
