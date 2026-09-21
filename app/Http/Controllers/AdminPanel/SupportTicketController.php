<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\SupportTicketMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    public function index()
    {
        $tickets = SupportTicket::with('user')->latest()->get();

        return Inertia::render('AdminPanel/Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function show($id)
    {
        $ticket = SupportTicket::with(['user', 'messages.user'])->findOrFail($id);

        return Inertia::render('AdminPanel/Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function reply(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:3000',
            'status' => 'required|in:open,in_progress,resolved,closed',
        ]);

        SupportTicketMessage::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
        ]);

        $ticket->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Reply added and status updated successfully!');
    }

    public function updateStatus(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
        ]);

        $ticket->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Ticket status updated successfully!');
    }
}
