<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function howItWorks()
    {
        return Inertia::render('HowItWorks');
    }

    public function privacy()
    {
        return Inertia::render('Legal', ['doc' => 'privacy']);
    }

    public function terms()
    {
        return Inertia::render('Legal', ['doc' => 'terms']);
    }
}
