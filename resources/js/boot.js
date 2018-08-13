
window._ = require('lodash');

try {

    require('html5shiv');
    require('bootstrap');

    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js');
    require('bootstrap');

} catch (e) {}

/**
 * A biblioteca HTTP axios permite facilmente emitir pedidos para o
 * back-end do Laravel. Esta biblioteca lida automaticamente com o envio do
 * token CSRF em forma de cabeçalho baseado no valor do cookie do token "XSRF".
 */

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Por conveniência, é registrado o token CSRF como um cabeçalho no Axios, de
 * modo que todas as solicitações HTTP sejam efetuadas automaticamente com o token.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.csrf_token = token.content;
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
