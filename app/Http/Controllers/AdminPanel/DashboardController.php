<?php
namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminPanel/Dashboard', [
            'stats' => [
                'totalOrders' => Order::count(),
                'pendingOrders' => Order::where('status', 'placed')->count(),
                'totalRevenue' => Order::where('payment_status', 'paid')->sum('total'),
                'totalProducts' => Product::count(),
                'totalUsers' => User::where('role', 'customer')->count(),
                'newLeads' => Lead::where('is_read', false)->count(),
            ],
            'recentOrders' => Order::with('user', 'items')->latest()->take(10)->get(),
            'recentLeads' => Lead::latest()->take(5)->get(),
        ]);
    }
}
