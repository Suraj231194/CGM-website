<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PaymentSetting;
use App\Models\ShippingAddress;
use App\Models\ShippingCharge;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->with('items.product')->first();

        if ($request->wantsJson() || $request->query('json')) {
            if (!$cart || $cart->items->isEmpty()) {
                return response()->json(['error' => 'Your cart is empty.'], 400);
            }
            return response()->json([
                'cartItems' => $cart->items->map(fn($item) => [
                    'id' => $item->id,
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->price * $item->quantity,
                ]),
                'subtotal' => $cart->subtotal,
                'paymentSettings' => PaymentSetting::first(),
                'user' => $request->user(),
            ]);
        }

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->to('/')->with('error', 'Your cart is empty.');
        }

        return Inertia::render('Checkout', [
            'cartItems' => $cart->items->map(fn($item) => [
                'id' => $item->id,
                'product' => $item->product,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'subtotal' => $item->price * $item->quantity,
            ]),
            'subtotal' => $cart->subtotal,
            'paymentSettings' => PaymentSetting::first(),
            'user' => $request->user(),
        ]);
    }

    public function getShippingCharge(Request $request)
    {
        $request->validate(['pincode' => 'required|digits:6']);
        $charge = ShippingCharge::getChargeForPincode($request->pincode);

        return response()->json(['charge' => $charge]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'email' => 'required|email|max:255',
            'address_line_1' => 'required|string|max:500',
            'address_line_2' => 'nullable|string|max:500',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|digits:6',
            'payment_method' => 'required|in:cod,online',
            'transaction_id' => 'nullable|required_if:payment_method,online|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        $cart = Cart::where('user_id', $request->user()->id)->with('items.product')->firstOrFail();

        if ($cart->items->isEmpty()) {
            return redirect()->to('/')->with('error', 'Your cart is empty.');
        }

        $subtotal = $cart->subtotal;
        $shippingCharge = ShippingCharge::getChargeForPincode($validated['pincode']);
        $total = $subtotal + $shippingCharge;

        $paymentStatus = $validated['payment_method'] === 'cod' ? 'pending' : 'pending_verification';

        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_number' => Order::generateOrderNumber(),
            'status' => 'placed',
            'subtotal' => $subtotal,
            'shipping_charge' => $shippingCharge,
            'total' => $total,
            'payment_method' => $validated['payment_method'],
            'payment_status' => $paymentStatus,
            'transaction_id' => $validated['transaction_id'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        // Create order items
        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);
        }

        // Create shipping address
        ShippingAddress::create([
            'order_id' => $order->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'address_line_1' => $validated['address_line_1'],
            'address_line_2' => $validated['address_line_2'] ?? null,
            'city' => $validated['city'],
            'state' => $validated['state'],
            'pincode' => $validated['pincode'],
        ]);

        // Clear cart
        $cart->items()->delete();
        $cart->delete();

        return redirect()->route('order.confirmation', $order->id)
            ->with('success', 'Your order has been placed successfully!');
    }
}
