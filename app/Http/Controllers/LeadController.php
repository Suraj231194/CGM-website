<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'role' => 'required|in:patient,caregiver,hcp,distributor,other',
            'product_interest' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'consent' => 'required|accepted',
            'source_page' => 'nullable|string|max:255',
        ]);

        $validated['consent'] = true;

        Lead::create($validated);

        return redirect()->back()->with('success', 'Thank you for your inquiry! Our team will be in touch within 24 hours.');
    }
}
