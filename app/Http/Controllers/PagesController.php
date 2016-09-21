<?php

namespace App\Http\Controllers;

#use App\User;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{
  public function getIndex(){
     return view('welcome');
  }
  public function getAbout(){
    $companyName="Code Executable";
    $isUserRegistered=false;
    $users=array("Bubbles","Blossom","Buttercup");
     return view('pages.about')
     ->with("name",$companyName)
     ->with("isUserRegistered",$isUserRegistered)
     ->with("users",$users);
  }
  public function getContact(){
    
    return view('pages.contact');
  }


  
}