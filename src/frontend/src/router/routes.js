export default [
  {
    path: '/',
    name: 'IndexHome',
    components: () => import('../views/Index'),
    meta: {
      layout: 'AppLayoutMain',
    },
  }
];
