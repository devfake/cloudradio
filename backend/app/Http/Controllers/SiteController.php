<?php

  namespace App\Http\Controllers;

  class SiteController extends Controller {

    public function app($sharedID = null)
    {
      return view('app');
    }
  }