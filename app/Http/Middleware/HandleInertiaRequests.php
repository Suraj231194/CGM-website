<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cartCount = 0;
        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->with('items')->first();
            $cartCount = $cart ? $cart->items->sum('quantity') : 0;
        } else {
            $sessionId = $request->session()->getId();
            $cart = Cart::where('session_id', $sessionId)->with('items')->first();
            $cartCount = $cart ? $cart->items->sum('quantity') : 0;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => $cartCount,
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'open_cart' => fn() => $request->session()->get('open_cart'),
                'open_checkout' => fn() => $request->session()->get('open_checkout'),
            ],
        ];
    }
}
