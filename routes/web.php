<?php

use App\Http\Controllers\AdminPanel\DashboardController as AdminDashboardController;
use App\Http\Controllers\AdminPanel\LeadController as AdminLeadController;
use App\Http\Controllers\AdminPanel\OrderController as AdminOrderController;
use App\Http\Controllers\AdminPanel\ProductController as AdminProductController;
use App\Http\Controllers\AdminPanel\SettingsController as AdminSettingsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HcpController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;

// ── Public Routes ─────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/compare', [ProductController::class, 'compare'])->name('products.compare');
Route::get('/how-it-works', [PageController::class, 'howItWorks'])->name('how-it-works');
Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/support', [SupportController::class, 'index'])->name('support');
Route::get('/hcp', [HcpController::class, 'index'])->name('hcp');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');

// ── Cart (works for guests and auth users) ────────────────────
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::patch('/cart/update/{item}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{item}', [CartController::class, 'remove'])->name('cart.remove');

// ── Checkout & Orders (auth required) ─────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::get('/checkout/shipping-charge', [CheckoutController::class, 'getShippingCharge'])->name('checkout.shipping');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/order-confirmation/{id}', [OrderController::class, 'confirmation'])->name('order.confirmation');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // Support Tickets (User)
    Route::post('/support-tickets', [\App\Http\Controllers\SupportTicketController::class, 'store'])->name('support-tickets.store');
    Route::post('/support-tickets/{ticket}/reply', [\App\Http\Controllers\SupportTicketController::class, 'reply'])->name('support-tickets.reply');
});

// ── Authenticated Profile ─────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function (Illuminate\Http\Request $request) {
        if ($request->user() && $request->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect('/');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ── Admin Panel ───────────────────────────────────────────────
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Support Tickets (Admin)
    Route::get('/tickets', [\App\Http\Controllers\AdminPanel\SupportTicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/{id}', [\App\Http\Controllers\AdminPanel\SupportTicketController::class, 'show'])->name('tickets.show');
    Route::post('/tickets/{ticket}/reply', [\App\Http\Controllers\AdminPanel\SupportTicketController::class, 'reply'])->name('tickets.reply');
    Route::patch('/tickets/{ticket}/status', [\App\Http\Controllers\AdminPanel\SupportTicketController::class, 'updateStatus'])->name('tickets.updateStatus');

    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::get('/products/{id}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{id}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.updateStatus');

    Route::get('/leads', [AdminLeadController::class, 'index'])->name('leads.index');
    Route::patch('/leads/{id}/read', [AdminLeadController::class, 'markRead'])->name('leads.markRead');

    Route::get('/shipping', [AdminSettingsController::class, 'shipping'])->name('shipping.index');
    Route::post('/shipping', [AdminSettingsController::class, 'storeShipping'])->name('shipping.store');
    Route::put('/shipping/{id}', [AdminSettingsController::class, 'updateShipping'])->name('shipping.update');
    Route::delete('/shipping/{id}', [AdminSettingsController::class, 'deleteShipping'])->name('shipping.destroy');

    Route::get('/payment-settings', [AdminSettingsController::class, 'paymentSettings'])->name('payment.index');
    Route::post('/payment-settings', [AdminSettingsController::class, 'updatePaymentSettings'])->name('payment.update');
});

require __DIR__.'/auth.php';
