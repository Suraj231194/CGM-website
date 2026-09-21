<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductComparisonItem extends Model
{
    protected $fillable = [
        'product_id', 'category', 'label', 'value', 'highlight',
    ];

    protected $casts = [
        'highlight' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
