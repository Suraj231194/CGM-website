<?php

namespace App\Http\Controllers;

use App\Models\SupportResource;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        return Inertia::render('Resources', [
            'resources' => SupportResource::public()->with('product')->get(),
        ]);
    }
}
