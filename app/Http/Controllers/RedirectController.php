<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\RedirectLink;
use Inertia\Inertia;

class RedirectController extends Controller
{
    public function showNotice($productSlug, $linkKey)
    {
        $product = Product::where('slug', $productSlug)->firstOrFail();
        $redirectLink = RedirectLink::where('product_id', $product->id)
            ->where('link_key', $linkKey)
            ->active()
            ->firstOrFail();

        return Inertia::render('RedirectNotice', [
            'product' => $product,
            'redirectLink' => $redirectLink,
        ]);
    }
}
