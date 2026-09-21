<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingAddress extends Model
{
    protected $fillable = ['order_id', 'name', 'phone', 'email', 'address_line_1', 'address_line_2', 'city', 'state', 'pincode'];
    public function order(): BelongsTo { return $this->belongsTo(Order::class); }
}
