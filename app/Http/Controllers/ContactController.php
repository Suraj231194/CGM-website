<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact', [
            'products' => Product::active()->ordered()->get(['id', 'name', 'slug']),
        ]);
    }
}
