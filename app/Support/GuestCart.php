<?php

namespace App\Support;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class GuestCart
{
    /**
     * The most of one product a cart line may hold (matches the cart validation rules).
     */
    private const MAX_QUANTITY = 10;

    /**
     * Move the items of a guest's session cart into the user's cart.
     *
     * Call with the session id captured before the session is regenerated on
     * sign-in or registration. Lines for a product the user already has are
     * combined, capped at the cart limit; the emptied guest cart is removed.
     */
    public static function mergeInto(string $guestSessionId, User $user): void
    {
        DB::transaction(function () use ($guestSessionId, $user) {
            $guest = Cart::where('session_id', $guestSessionId)
                ->whereNull('user_id')
                ->with('items')
                ->first();

            if (! $guest) {
                return;
            }

            // Same lookup CartController uses for a signed-in user's cart.
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);

            foreach ($guest->items as $item) {
                $existing = CartItem::where('cart_id', $cart->id)
                    ->where('product_id', $item->product_id)
                    ->first();

                if ($existing) {
                    $existing->update([
                        'quantity' => min(self::MAX_QUANTITY, $existing->quantity + $item->quantity),
                    ]);
                    $item->delete();
                } else {
                    $item->update(['cart_id' => $cart->id]);
                }
            }

            $guest->delete();
        });
    }
}
