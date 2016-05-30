![cloudradioo](http://i.imgur.com/lf18DnW.jpg)

cloudradioo
===============

[cloudradioo.com](http://cloudradioo.com) is a web app for modern browsers that plays randomly all top 50 songs from the soundcloud charts. You will discover your new favorite song!

It's build on top of [Laravel](https://www.laravel.com) and [Vue.js](http://vuejs.org) (with [Vuex](https://github.com/vuejs/vuex)).

### Requirements

* PHP 5.5.9+
* [Composer](https://getcomposer.org/)
* Node / NPM for development
* Soundcloud developer account for the [API-Key](https://developers.soundcloud.com/).

### Install

* Download cloudradioo and `cd` into `/backend`.
* Rename `.env.example` to `.env` and set your soundcloud api key for `CLIENT_ID`.
* Run `composer install`.
* Give `/backend/storage` recursive write access.
* Access site over `/public`.

##### Development

* Run `npm install` in your `/client` folder.
* Run `gulp watch` or `gulp watch --production` and make your work.

### Misc

There is an default 6-hour cache for access all songs from the charts. Set a Cron for the `/all-songs` route, so that the cache is always renewed.

### ToDo

* Repeat-Button
* Improve caching
* Sort charts by `trending` or `top`
* Reponsive version
* Other colors
* Safari is crashing
