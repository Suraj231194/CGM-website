<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RedirectEvent extends Model
{
    protected $fillable = [
        'product_id', 'redirect_link_id', 'source_page',
        'clicked_at', 'ip_address', 'user_agent',
    ];

    protected $casts = [
        'clicked_at' => 'datetime',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function redirectLink(): BelongsTo
    {
        return $this->belongsTo(RedirectLink::class);
    }
}
