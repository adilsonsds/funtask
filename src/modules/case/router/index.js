import Case from '../pages/Case';
import CaseHome from '../pages/CaseHome';
import CaseLicoes from '../pages/CaseLicoes';
import CaseAlunos from '../pages/CaseAlunos';
import CaseGrupos from '../pages/CaseGrupos';
import CaseTrofeus from '../pages/CaseTrofeus';
import ManterCase from '../pages/ManterCase';
import Licao from '../pages/Licao';
import LicaoEntrega from '../pages/LicaoEntrega';
import LicaoAvaliacao from '../pages/LicaoAvaliacao';
import ManterTrofeu from '../pages/ManterTrofeu';

export default [{
    path: '/case/novo',
    name: 'case-novo',
    component: ManterCase,
    title: 'Novo Case de Negócio',
    icon: 'fa-comments'
  },
  {
    path: '/case/:id/edit',
    name: 'case-editar',
    component: ManterCase,
    title: 'Editar Case de Negócio',
    icon: 'fa-comments'
  },
  {
    path: '/case/:id',
    name: 'case',
    component: Case,
    title: 'Case',
    icon: 'fa-comments',
    redirect: {
      name: 'case-home'
    },
    children: [{
        path: 'trofeus',
        name: 'case-trofeus',
        component: CaseTrofeus
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
    path: '/case/:idCase/licao/:idLicao?',
    name: 'case-licao',
    component: Licao,
    title: 'Lição',
    icon: 'fa-comments'
  }, {
    path: '/case/:idCase/entrega/:idEntregaDeLicao',
    name: 'case-entrega',
    component: LicaoEntrega,
    title: 'Lição',
    icon: 'fa-comments'
  }, {
    path: '/case/:idCase/avaliacao/:idLicao',
    name: 'case-avaliacao',
    component: LicaoAvaliacao,
    title: 'Avaliação de Lições',
    icon: 'fa-comments'
  },
  {
    path: '/case/:idCase/trofeu',
    name: 'trofeu-novo',
    component: ManterTrofeu,
    title: 'Novo Troféu',
    icon: 'fa-comments'
  },
  {
    path: '/case/:idCase/trofeu/:id/edit',
    name: 'trofeu-editar',
    component: ManterTrofeu,
    title: 'Editar Troféu',
    icon: 'fa-comments'
  },
];
