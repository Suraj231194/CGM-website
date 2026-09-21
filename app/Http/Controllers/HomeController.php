<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'products' => Product::active()->ordered()->with('features')->get(),
            'faqs' => Faq::general()->ordered()->take(4)->get(),
            'blogPosts' => BlogPost::published()->latest('published_at')->take(3)->get(),
        ]);
    }
}
