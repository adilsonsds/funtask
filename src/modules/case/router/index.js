import Case from '../pages/Case';
import CaseHome from '../pages/CaseHome';
import CaseLicoes from '../pages/CaseLicoes';
import CaseAlunos from '../pages/CaseAlunos';
import CaseGrupos from '../pages/CaseGrupos';
import CaseCriterios from '../pages/CaseCriterios';
import Licao from '../pages/Licao';

export default [{
  path: '/case/:id',
  name: 'case',
  component: Case,
  title: 'Case',
  icon: 'fa-comments',
  redirect: {
    name: 'case-home'
  },
  children: [{
      path: 'criterios',
      name: 'case-criterios',
      component: CaseCriterios
    },
    {
      path: 'grupos',
      name: 'case-grupos',
      component: CaseGrupos
    },
    {
      path: 'alunos',
      name: 'case-alunos',
      component: CaseAlunos,
    },
    {
      path: 'licoes',
      name: 'case-licoes',
      component: CaseLicoes,
    },
    {
      path: '',
      name: 'case-home',
      component: CaseHome,
    },
  ],
}, {
  path: '/case/licao',
  name: 'case-licao',
  component: Licao,
  title: 'Lição',
  icon: 'fa-comments'
}];
