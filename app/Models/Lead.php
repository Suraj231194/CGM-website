<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'role', 'product_interest',
        'message', 'consent', 'source_page', 'is_read',
    ];

    protected $casts = [
        'consent' => 'boolean',
        'is_read' => 'boolean',
    ];
}
