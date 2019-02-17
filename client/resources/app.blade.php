<!doctype html>
<html>
<head>

  <meta charset="utf-8">
  <meta class="base-uri" content="{{ url('/') }}">
  <meta name="description" content="cloudradio is a service that plays randomly all top 50 songs from the soundcloud charts. You will discover your new favorite song! ;)">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>cloudradio | Discover New Music</title>

  <link href="{{ url('assets/favicon.ico?v=1') }}" rel="icon" type="image/x-icon">
  <link href="{{ url('assets/css/app.css') }}" rel="stylesheet">

</head>
<body>

  <div class="app">

    <progress></progress>
    <cloudradio-header></cloudradio-header>
    <navigation></navigation>

    <div class="svg-wrap"></div>

  </div>

  <script src="{{ url('assets/js/vendor.js') }}"></script>
  <script src="{{ url('assets/js/app.js') }}"></script>
</body>
</html>
