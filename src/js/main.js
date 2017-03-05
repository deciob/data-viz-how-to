import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';
import rlite from 'rlite-router';

const route = rlite(notFound, {
  // Default route
  '': function () {
    return 'Home';
  },

  // #inbox
  'inbox': function () {
    return 'Inbox';
  },

  // #sent?to=john -> r.params.to will equal 'john'
  'sent': function ({ to }) {
    return 'Sent to ' + to;
  },

  // #users/chris -> r.params.name will equal 'chris'
  'users/:name': function ({ name }) {
    return 'User ' + name;
  },

  // #logout
  'logout': function () {
    return 'Logout';
  },
});

function notFound () {
  return '<h1>404 Not found :/</h1>';
}
