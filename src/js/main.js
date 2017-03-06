import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';
import page from 'page';


page('/', index);
page('/about', about);
page('/contact', contact);
page('/contact/:contactName', contact);
page();

function index() {
  document.querySelector('.main')
    .textContent = 'viewing index';
}

function about() {
  document.querySelector('.main')
    .textContent = 'viewing about';
}

function contact(ctx) {
  document.querySelector('.main')
    .textContent = 'viewing contact ' + (ctx.params.contactName || '');
}
