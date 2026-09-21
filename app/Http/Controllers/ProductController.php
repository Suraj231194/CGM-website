<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::active()->ordered()->get(),
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['features', 'specifications', 'faqs', 'resources', 'redirectLinks' => fn($q) => $q->active()])
            ->firstOrFail();

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function compare()
    {
        $products = Product::active()->ordered()
            ->with('comparisonItems')
            ->get();

        return Inertia::render('Products/Compare', [
            'products' => $products,
        ]);
    }
}
