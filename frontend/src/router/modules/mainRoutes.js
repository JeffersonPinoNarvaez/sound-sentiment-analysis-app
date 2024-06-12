import DefaultLayout from '@/layouts/DefaultLayout';
import soundClassifierRoutes from './soundClassifierRoutes.js';

export default [
  {
    path: '/',
    name: 'Inicio',
    component: DefaultLayout,
    redirect: '/sound-classifier',
    children: [
      ...soundClassifierRoutes
    ],
  },
];