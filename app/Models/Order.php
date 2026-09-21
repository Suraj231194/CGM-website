<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_number', 'status', 'subtotal', 'shipping_charge',
        'total', 'payment_method', 'payment_status', 'transaction_id',
        'transaction_screenshot', 'notes',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function items(): HasMany { return $this->hasMany(OrderItem::class); }
    public function shippingAddress(): HasOne { return $this->hasOne(ShippingAddress::class); }

    public static function generateOrderNumber(): string
    {
        return 'ZH-' . strtoupper(date('Ymd')) . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
    }
}
