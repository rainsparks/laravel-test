<!DOCTYPE html>
<html>
<head>
<title>
@yield('title')
</title>
</head>

<body>
@include('layouts.menu') {{--yield view--}}
@yield('body')			{{--yield section--}}
</body>
</html>