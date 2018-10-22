import Home from '../pages/Home';

export default [{
  path: '/dashboard',
  name: 'dashboard',
  component: Home,
  title: 'Dashboard',
  icon: 'fa-comments',
  meta: {
    requiresAuth: true
  }
}, ];
