<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'short_description', 'long_description',
        'image_url', 'price', 'sale_price', 'stock', 'status', 'display_order',
    ];

    protected $casts = ['price' => 'decimal:2', 'sale_price' => 'decimal:2'];

    public function features(): HasMany { return $this->hasMany(ProductFeature::class)->orderBy('display_order'); }
    public function specifications(): HasMany { return $this->hasMany(ProductSpecification::class)->orderBy('display_order'); }
    public function comparisonItems(): HasMany { return $this->hasMany(ProductComparisonItem::class); }
    public function redirectLinks(): HasMany { return $this->hasMany(RedirectLink::class); }
    public function faqs(): HasMany { return $this->hasMany(Faq::class)->orderBy('display_order'); }
    public function resources(): HasMany { return $this->hasMany(SupportResource::class); }

    public function scopeActive($query) { return $query->where('status', 'active'); }
    public function scopeOrdered($query) { return $query->orderBy('display_order'); }

    public function getEffectivePriceAttribute(): float
    {
        return $this->sale_price && $this->sale_price > 0 ? (float) $this->sale_price : (float) $this->price;
    }

    public function getInStockAttribute(): bool
    {
        return $this->stock > 0;
    }
}
