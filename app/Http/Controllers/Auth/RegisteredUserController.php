<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Send OTP email to user before registration.
     *
     * @param Request $request
     * @param EmailService $emailService
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function sendOtp(Request $request, EmailService $emailService)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $otp = (string) random_int(100000, 999999);

        // Store OTP in Cache for 15 minutes
        Cache::put('register_otp_' . $request->email, [
            'otp' => $otp,
            'email' => $request->email,
        ], 900);

        // Send email via Brevo
        $sent = $emailService->sendOtp($request->email, $otp, $request->name);

        if (!$sent) {
            throw ValidationException::withMessages([
                'email' => 'Failed to send OTP verification email. Please check your email address or try again later.',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Verification code sent to your email.'
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'otp' => 'required|string|size:6',
        ]);

        $cached = Cache::get('register_otp_' . $request->email);

        if (!$cached || $cached['otp'] !== $request->otp) {
            throw ValidationException::withMessages([
                'otp' => 'The entered OTP code is incorrect or has expired.',
            ]);
        }

        // Clean cache
        Cache::forget('register_otp_' . $request->email);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
