<?php

  Route::get('/{sharedID?}', 'SiteController@app');

  Route::group(['prefix' => 'api'], function() {

    Route::get('/all-genres', 'ApiController@allGenres');
    Route::get('/all-songs', 'ApiController@allSongs');
    Route::get('/songs', 'ApiController@songs');

    Route::get('/change-filter', 'ApiController@changeFilter');
    Route::get('/clear-cache', 'ApiController@clearCache');
    Route::get('/api-key', 'ApiController@getAPIKey');

  });