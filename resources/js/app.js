

/**
 * Carregamento inicial
 */
require('./boot');

/**
 * Carregamento de todas as bibliotecas de dependencia javascript do projeto.
 */
require('jquery-confirm');
require('@fortawesome/fontawesome-free/js/all.js'); // transforma os <i> em <svg>

/**
 * Objeto Admin
 */
var App = window.App = {

    init: function()
    {
        console.log('hohoho');
    }

};

$(document).ready(function () {
    App.init();
});

// Quando a janela estiver sendo redimensionada,
// redomensiona os elementos apenas quando o
// evento de redimensionamento da janela terminar
var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function () {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(function () {
            // panel.resizeLayout();
        }, delta);
    }
});
