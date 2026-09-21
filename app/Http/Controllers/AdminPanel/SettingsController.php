<?php
namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\ShippingCharge;
use App\Models\PaymentSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function shipping()
    {
        return Inertia::render('AdminPanel/Shipping', [
            'zones' => ShippingCharge::all(),
        ]);
    }

    public function storeShipping(Request $request)
    {
        $validated = $request->validate([
            'zone' => 'required|string|max:100',
            'min_pincode' => 'required|digits:6',
            'max_pincode' => 'required|digits:6',
            'charge' => 'required|numeric|min:0',
        ]);
        $validated['is_active'] = true;

        ShippingCharge::create($validated);
        return redirect()->back()->with('success', 'Shipping zone added.');
    }

    public function updateShipping(Request $request, $id)
    {
        $validated = $request->validate([
            'zone' => 'required|string|max:100',
            'min_pincode' => 'required|digits:6',
            'max_pincode' => 'required|digits:6',
            'charge' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        ShippingCharge::findOrFail($id)->update($validated);
        return redirect()->back()->with('success', 'Shipping zone updated.');
    }

    public function deleteShipping($id)
    {
        ShippingCharge::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Shipping zone deleted.');
    }

    public function paymentSettings()
    {
        return Inertia::render('AdminPanel/PaymentSettings', [
            'settings' => PaymentSetting::first(),
        ]);
    }

    public function updatePaymentSettings(Request $request)
    {
        $validated = $request->validate([
            'upi_id' => 'nullable|string|max:255',
            'payment_instructions' => 'nullable|string|max:1000',
            'qr_image' => 'nullable|image|max:2048',
        ]);

        $settings = PaymentSetting::firstOrCreate([]);

        if ($request->hasFile('qr_image')) {
            $validated['qr_code_image'] = '/storage/' . $request->file('qr_image')->store('payment', 'public');
        }

        $settings->update([
            'upi_id' => $validated['upi_id'] ?? $settings->upi_id,
            'payment_instructions' => $validated['payment_instructions'] ?? $settings->payment_instructions,
            'qr_code_image' => $validated['qr_code_image'] ?? $settings->qr_code_image,
        ]);

        return redirect()->back()->with('success', 'Payment settings updated.');
    }
}
