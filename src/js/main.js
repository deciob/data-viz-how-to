import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';
import rlite from 'rlite-router';

import './templates';

const route = rlite(notFound, {
  // Default route
  '': function (params, state, url) {
    window.location.hash = 'intro';
  },

  'intro': function (params, state, url) {
    document.body.innerHTML = templates.intro;
  },

  'lua/:vizType/:version': function (params, state, url) {
    // Do interesting stuff here...
  }
});

function notFound () {
  return '<h1>404 Not found :/</h1>';
}
