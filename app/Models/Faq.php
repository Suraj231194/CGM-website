<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Faq extends Model
{
    protected $fillable = [
        'question', 'answer', 'category', 'product_id', 'display_order',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeGeneral($query)
    {
        return $query->whereNull('product_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }
}
