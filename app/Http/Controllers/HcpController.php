<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class HcpController extends Controller
{
    public function index()
    {
        return Inertia::render('Hcp', [
            'products' => Product::active()->ordered()->with('features', 'specifications')->get(),
        ]);
    }
}
