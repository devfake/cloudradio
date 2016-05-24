var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

elixir.config.sourcemaps = false;

elixir.config.css.outputFolder = './../public/assets/css';
elixir.config.js.outputFolder = './../public/assets/js';
elixir.config.assetsPath = 'resources/';
elixir.config.publicPath = '../public/';

elixir(function(mix) {
  mix.sass('app.scss');

  mix.browserify('./app/app.js');

  //mix.task('browserify', './app/**/**.js');
});