cloudradio
===============

[cloudradio.pyxl.cloud](https://cloudradio.pyxl.cloud) is a web app for modern browsers that plays randomly all top 50 songs from the soundcloud charts. You will discover your new favorite song!

It's build on top of [Laravel](https://www.laravel.com) and [Vue.js](http://vuejs.org) (with [Vuex](https://github.com/vuejs/vuex)).

![cloudradio](http://i.imgur.com/DqF9ARE.png)

### Requirements

* PHP 5.5.9+
* [Composer](https://getcomposer.org/)
* Node / NPM for development
* Soundcloud developer account for the [API-Key](https://developers.soundcloud.com/).

### Install

* Download cloudradio and `cd` into `/backend`.
* Rename `.env.example` to `.env` and set your soundcloud api key for `CLIENT_ID`.
* Run `composer install`.
* Give `/backend/storage` recursive write access.
* Access site over `/public`.

##### Development

* Run `npm install` in your `/client` folder.
* Make sure you have installed `webpack` globally.
* Run `npm run dev` or  `npm run build`.

### Misc

There is an default 6-hour cache for access all songs from the charts. Set a Cron for the `/all-songs` route, so that the cache is always renewed.

### ToDo

* Repeat-Button
* Buffer-Icon
* Sort charts by `trending` or `top`
* Safari is crashing
