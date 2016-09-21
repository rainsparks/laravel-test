

@extends('layouts.layout')
@section('title')
Create New Product 
@stop 

@section('body')
     {!!Form::open(['route'=> 'product.store'])!!}
     {!!Form::label('name','Name')!!}
     {!!Form::text('name',null,['placeholder'=>"Give a name"])!!}
      <br>
     {!!Form::label('price','Price')!!}  
     {!!Form::text('price',"0$",['placeholder'=>"Give a price"])!!}
     <br>
     {!!Form::submit('Create')!!}


     {!!Form::close()!!}
@stop