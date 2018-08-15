
/**
 * --------------------------------------------------------------------------
 * app.js
 * Copyright (c) 2018 Ricardo Pereira Dias (https://rpdesignerfly.github.io)
 * Neste arquivo são efetuadas as chamadas a todas as dependências javascript
 * --------------------------------------------------------------------------
 */

window._ = require('lodash');

try {

    // Retro-compatibilidade
    require('html5shiv');

    // Bibliotecas globais
    window.$ = window.jQuery = require('jquery');
    window.axios = require('axios');
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Fontawesome
    require('./fontawesome/index');

    // Bootstrap
    require('./bootstrap/index');

    // Componentes adicionais
    require('./jquery-confirm/index');

    // Implementações do site
    require('./site');

} catch (e) {}
