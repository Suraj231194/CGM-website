<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\SupportTicketMessage;
use Illuminate\Http\Request;

class SupportTicketController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string|max:3000',
            'image' => 'nullable|image|max:4096', // Max 4MB
        ]);

        $ticket = SupportTicket::create([
            'user_id' => $request->user()->id,
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'status' => 'open',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('support_tickets', 'public');
            $ticket->update(['image_path' => '/storage/' . $path]);
        }

        // Add the description as the first message in the chat thread
        SupportTicketMessage::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $validated['description'],
        ]);

        return redirect()->back()->with('success', 'Support ticket submitted successfully!');
    }

    public function reply(Request $request, SupportTicket $ticket)
    {
        // Check authorization
        if ((int) $ticket->user_id !== (int) $request->user()->id && !$request->user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:3000',
        ]);

        SupportTicketMessage::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
        ]);

        // Reopen the ticket or keep it open since the user replied
        $ticket->update(['status' => 'open']);

        return redirect()->back()->with('success', 'Reply sent successfully!');
    }
}
