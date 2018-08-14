
window._ = require('lodash');

try {

    require('html5shiv');

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
