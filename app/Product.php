<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //Product class name singular, products table name (automatic)
    //To specify manually table

    protected $table='products';
}