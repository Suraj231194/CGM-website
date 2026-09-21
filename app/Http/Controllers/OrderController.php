<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items')
            ->latest()
            ->get();

        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    public function show(Request $request, $id)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->with(['items.product', 'shippingAddress'])
            ->findOrFail($id);

        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    public function confirmation(Request $request, $id)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->with(['items.product', 'shippingAddress'])
            ->findOrFail($id);

        return Inertia::render('OrderConfirmation', ['order' => $order]);
    }
}
