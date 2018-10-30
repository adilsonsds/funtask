import Home from '../pages/Home';
import Manter from '../pages/Manter';

export default [{
    path: '/case/:idCase/novo',
    name: 'grupo-novo',
    component: Manter,
    title: 'Grupo',
    icon: 'fa-comments'
  },
  {
    path: '/group/:id/edit',
    name: 'grupo-editar',
    component: Manter,
    title: 'Grupo',
    icon: 'fa-comments'
  },
  {
    path: '/group/:id',
    name: 'grupo',
    component: Home,
    title: 'Grupo',
    icon: 'fa-comments'
  }
];
