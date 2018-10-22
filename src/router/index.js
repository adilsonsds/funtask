import Router from 'vue-router';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Cadastro from '@/pages/Cadastro';

import caseRoutes from '@/modules/case/router';
import usuarioRoutes from '@/modules/usuario/router';
import grupoRoutes from '@/modules/grupo/router';
import dashboardRoutes from '@/modules/dashboard/router';

const baseRoutes = [{
    path: '/login',
    name: 'login',
    title: 'Login',
    icon: 'fa-tachometer',
    component: Login,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    title: 'Cadastro',
    icon: 'fa-tachometer',
    component: Cadastro,
  },
  {
    path: '/',
    name: 'home',
    title: 'Home',
    icon: 'fa-tachometer',
    component: Home,
    redirect: {
      name: 'login'
    }
  },
  {
    path: '*',
    redirect: {
      name: 'login'
    }
  },
];

const routes = baseRoutes.concat(caseRoutes, usuarioRoutes, grupoRoutes, dashboardRoutes);

export default new Router({
  routes,
  mode: 'history'
});