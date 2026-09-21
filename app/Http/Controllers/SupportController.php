<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\SupportResource;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index()
    {
        return Inertia::render('Support', [
            'faqs' => Faq::ordered()->with('product')->get(),
            'resources' => SupportResource::public()->with('product')->take(6)->get(),
        ]);
    }
}
