@extends('layouts.layout')

@section('title')
About
@stop

@section('body')


<h1>This is the about page</h1>
<p> {{$name}} </p>
<Span> Test for git </Span>

 @if($isUserRegistered== true)
 Hello mate
 @else
 Please register
 @endif

 @for($i=0; $i<10; $i++)
 <br>
 {{$i}} 
 @endfor

 @foreach($users as $user)
 <br> {{$user}}
 @endforeach


@stop
