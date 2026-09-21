<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ShippingCharge extends Model
{
    protected $fillable = ['zone', 'min_pincode', 'max_pincode', 'charge', 'is_active'];
    protected $casts = ['is_active' => 'boolean', 'charge' => 'decimal:2'];

    public static function getChargeForPincode(string $pincode): float
    {
        $charge = static::where('is_active', true)
            ->where('min_pincode', '<=', $pincode)
            ->where('max_pincode', '>=', $pincode)
            ->first();
        if ($charge) return (float) $charge->charge;
        // Default: Rest of India
        $default = static::where('zone', 'Rest of India')->where('is_active', true)->first();
        return $default ? (float) $default->charge : 99.00;
    }
}
