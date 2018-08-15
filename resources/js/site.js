
/**
 * --------------------------------------------------------------------------
 * site.js
 * Copyright (c) 2018 Ricardo Pereira Dias (https://rpdesignerfly.github.io)
 * Implementações efetuadas para este site específico
 * --------------------------------------------------------------------------
 */

/**
 * Objeto App
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
