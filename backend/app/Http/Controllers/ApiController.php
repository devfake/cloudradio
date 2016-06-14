<?php

  namespace App\Http\Controllers;

  use GuzzleHttp\Client;
  use Illuminate\Support\Facades\Cache;
  use Illuminate\Support\Facades\Request;

  class ApiController extends Controller {

    /**
     * Sort charts by.
     * 'top' or 'trending'.
     * todo sort
     */
    private $sort = 'top';

    /**
     * API-URL from soundcloud to access the charts.
     */
    private $apiURL = 'https://api-v2.soundcloud.com/charts?genre=soundcloud:genres:%s&kind=%s&limit=50&client_id=%s';

    /**
     * Get all user filtered songs.
     * Cache is set forever, until default cache for all songs is cleared.
     */
    public function songs()
    {
      //$songs = Cache::rememberForever('filtered-songs', function() {
        $filters = Request::input('filters');
        $allSongs = collect($this->allSongs());

        // If no filter is set, set an random genre.
        if( ! $filters) {
          $genres = (array) json_decode($this->allGenres());
          $filters = [array_rand($genres) => 'random'];
        }

        return $allSongs->filter(function($value) use ($filters) {
          return array_key_exists($value['genre'], $filters);
        })->shuffle();
      //});

      // Get always a random list.
      //return $songs->shuffle();
    }

    /**
     * Get the (cached) json of the soundcloud charts.
     * Cache is set for 6 hours.
     */
    public function allSongs()
    {
      $songs = Cache::remember('all-songs', 360, function() {
        //Cache::forget('filtered-songs');
        $return = [];

        foreach(json_decode($this->allGenres()) as $key => $genre) {
          $client = new Client();

          $url = sprintf($this->apiURL, $genre, $this->sort, $this->getAPIKey());

          $response = $client->request('get', $url);
          $collection = json_decode($response->getBody())->collection;

          // We need only a few keys from the response.
          foreach($collection as $index => $item) {
            $track = $item->track;

            $return[$key][$index]['title'] = $track->title;
            $return[$key][$index]['id'] = $track->id;
            $return[$key][$index]['genre'] = $key;
            $return[$key][$index]['duration'] = $track->duration;
            $return[$key][$index]['permalink_url'] = $track->permalink_url;
            $return[$key][$index]['username'] = $track->user->username;
          }
        }

        return call_user_func_array('array_merge', $return);
      });

      return $songs;
    }

    /**
     * Change user filter and clear cache for songs.
     */
    public function changeFilter()
    {
      //Cache::forget('filtered-songs');
      
      return $this->songs();
    }

    /**
     * List of all soundcloud charts genres.
     */
    public function allGenres()
    {
      return json_encode([
        'Alternative Rock' => 'alternativerock',
        'Ambient' => 'ambient',
        'Classical' => 'classical',
        'Country' => 'country',
        'Dance & EDM' => 'danceedm',
        'Dancehall' => 'dancehall',
        'Deep House' => 'deephouse',
        'Disco' => 'disco',
        'Drum & Bass' => 'drumbass',
        'Dubstep' => 'dubstep',
        'Electronic' => 'electronic',
        'Folk & Singer-Songwriter' => 'folksingersongwriter',
        'Hip-hop & Rap' => 'hiphoprap',
        'House' => 'house',
        'Indie' => 'indie',
        'Jazz & Blues' => 'jazzblues',
        'Latin' => 'latin',
        'Metal' => 'metal',
        'Piano' => 'piano',
        'Pop' => 'pop',
        'R&B & Soul' => 'rbsoul',
        'Reggae' => 'reggae',
        'Reggaeton' => 'reggaeton',
        'Rock' => 'rock',
        'Soundtrack' => 'soundtrack',
        'Techno' => 'techno',
        'Trance' => 'trance',
        'Trap' => 'trap',
        'Triphop' => 'triphop',
        'World' => 'world',
      ]);
    }

    /**
     * Clear complete app cache.
     */
    public function clearCache()
    {
      Cache::flush();
    }

    /**
     * Return API client-key for soundcloud.
     */
    public function getAPIKey()
    {
      return env('CLIENT_ID');
    }
  }