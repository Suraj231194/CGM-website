<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getCart(Request $request): Cart
    {
        if ($request->user()) {
            $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        } else {
            $sessionId = $request->session()->getId();
            $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        }
        return $cart;
    }

    public function index(Request $request)
    {
        $cart = $this->getCart($request);
        $cart->load('items.product');

        if ($request->wantsJson() || $request->query('json')) {
            return response()->json([
                'items' => $cart->items->map(fn($item) => [
                    'id' => $item->id,
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->price * $item->quantity,
                ]),
                'subtotal' => $cart->subtotal,
                'totalItems' => $cart->total_items,
            ]);
        }

        return redirect()->to('/')->with('open_cart', true);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1|max:10',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = $this->getCart($request);
        $quantity = $request->quantity ?? 1;

        $existing = CartItem::where('cart_id', $cart->id)->where('product_id', $product->id)->first();

        if ($existing) {
            $existing->update(['quantity' => $existing->quantity + $quantity]);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->sale_price && $product->sale_price > 0 ? $product->sale_price : $product->price,
            ]);
        }

        return redirect()->back()->with('success', "{$product->name} added to cart!");
    }

    public function update(Request $request, $itemId)
    {
        $request->validate(['quantity' => 'required|integer|min:1|max:10']);
        $cart = $this->getCart($request);
        $item = CartItem::where('cart_id', $cart->id)->where('id', $itemId)->firstOrFail();
        $item->update(['quantity' => $request->quantity]);

        return redirect()->back();
    }

    public function remove(Request $request, $itemId)
    {
        $cart = $this->getCart($request);
        CartItem::where('cart_id', $cart->id)->where('id', $itemId)->delete();

        return redirect()->back()->with('success', 'Item removed from cart.');
    }
}
