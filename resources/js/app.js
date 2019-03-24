
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 // Retro-compatibilidade
 require('html5shiv');

 // Bibliotecas globais
 window.$ = window.jQuery = window.jquery = require('jquery');
 window.axios = require('axios');
 window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

require('bootstrap');
require('@fortawesome/fontawesome-free/js/all.js');

window.List = require('list.js');

require('./contact');
