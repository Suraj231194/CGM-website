<?php
namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::latest()->paginate(20);
        return Inertia::render('AdminPanel/Leads/Index', ['leads' => $leads]);
    }

    public function markRead($id)
    {
        Lead::findOrFail($id)->update(['is_read' => true]);
        return redirect()->back();
    }
}
