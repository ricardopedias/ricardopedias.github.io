
// Este script utiliza o Laravel Mix

let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'assets/js');
mix.sass('resources/sass/app.scss', 'assets/css');

// Fonte de ícones
mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'assets/fonts/fontawesome5');
