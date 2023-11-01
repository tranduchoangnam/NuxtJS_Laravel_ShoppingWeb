<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected  $fillable = [
        'sku',
        'name',
        'description',
        'price',
        'color',
        'brand',
        'collection',
        'size',
        'stock',
        'image',
        'old_price',
        'discount',
    ];
    protected $casts = [
        'color' => 'array',
        'size' => 'array',
        'image' => 'array',
    ];
}
