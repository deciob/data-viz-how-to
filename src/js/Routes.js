import uniloc from 'uniloc';

const Routes = uniloc({
  root: 'GET /',
  intro: 'GET /intro',
  viz: 'GET /viz/:dataset/:version',
});

export default Routes;
