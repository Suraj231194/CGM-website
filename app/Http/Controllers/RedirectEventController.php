<?php

namespace App\Http\Controllers;

use App\Models\RedirectEvent;
use Illuminate\Http\Request;

class RedirectEventController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'redirect_link_id' => 'required|exists:redirect_links,id',
            'source_page' => 'nullable|string|max:255',
        ]);

        RedirectEvent::create([
            ...$validated,
            'clicked_at' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json(['status' => 'ok']);
    }
}
