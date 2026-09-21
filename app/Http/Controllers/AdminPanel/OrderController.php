<?php
namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user', 'items', 'shippingAddress')->latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('AdminPanel/Orders/Index', [
            'orders' => $query->paginate(20),
            'filters' => $request->only('status'),
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'items.product', 'shippingAddress'])->findOrFail($id);

        return Inertia::render('AdminPanel/Orders/Show', ['order' => $order]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:placed,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'nullable|in:pending,paid,failed,pending_verification',
        ]);

        $order = Order::findOrFail($id);
        $order->update($request->only('status', 'payment_status'));

        return redirect()->back()->with('success', "Order #{$order->order_number} updated.");
    }
}
