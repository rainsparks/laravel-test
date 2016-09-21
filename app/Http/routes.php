<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'PagesController@getIndex')->name('home'); #named route
Route::get('test', function() {
	return "Hello World";
});
Route::get('test1', function () {
    return view('pages.test');
});

Route::get('about', 'PagesController@getAbout')->name('about'); #named route

Route::get('contact', 'PagesController@getContact')->name('contact'); #named route

Route::resource('product', 'ProductController');
