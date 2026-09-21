<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportResource extends Model
{
    protected $table = 'resources';

    protected $fillable = [
        'title', 'type', 'file_url', 'external_url', 'product_id', 'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }
}
