import uniloc from 'uniloc';

const Routes = uniloc({
  root: 'GET /',
  intro: 'GET /intro',
  viz: 'GET /viz/:id/:version',
});

export default Routes;
