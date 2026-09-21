<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EmailService
{
    /**
     * Send One-Time Password (OTP) for registration.
     *
     * @param string $email
     * @param string $otp
     * @param string $name
     * @return bool
     */
    public function sendOtp(string $email, string $otp, string $name): bool
    {
        $provider = env('EMAIL_NOTIFICATION_PROVIDER', 'brevo');

        if ($provider !== 'brevo') {
            Log::info("Skip sending actual email. Verification OTP for {$email} ({$name}) is: {$otp}");
            return true;
        }

        $apiKey = env('BREVO_API_KEY');
        $baseUrl = env('BREVO_BASE_URL', 'https://api.brevo.com/v3');
        $fromEmail = env('EMAIL_NOTIFICATION_FROM_EMAIL', 'operations.biogenix@gmail.com');
        $fromName = env('EMAIL_NOTIFICATION_FROM_NAME', 'biogenixCGM');
        $timeout = (int) env('BREVO_TIMEOUT_SECONDS', 15);
        $verifySsl = filter_var(env('BREVO_VERIFY_SSL', false), FILTER_VALIDATE_BOOLEAN);

        Log::info("Sending OTP verification email via Brevo to {$email}");

        try {
            $response = Http::withHeaders([
                'api-key' => $apiKey,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->timeout($timeout)
            ->withOptions([
                'verify' => $verifySsl
            ])
            ->post("{$baseUrl}/smtp/email", [
                'sender' => [
                    'name' => $fromName,
                    'email' => $fromEmail,
                ],
                'to' => [
                    [
                        'email' => $email,
                        'name' => $name,
                    ]
                ],
                'subject' => "Your Verification OTP Code — {$fromName}",
                'htmlContent' => "
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset='utf-8'>
                        <style>
                            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 40px 0; }
                            .container { max-width: 550px; margin: 0 auto; bg-color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
                            .header { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
                            .logo-txt { font-size: 20px; font-weight: 800; color: #0f766e; }
                            .title { font-size: 22px; font-weight: 755; color: #0f766e; margin-top: 0; }
                            .otp-box { font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #115e59; background-color: #f0fdfa; border: 1px dashed #99f6e4; padding: 16px 20px; text-align: center; border-radius: 12px; margin: 28px 0; }
                            .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; line-height: 1.5; }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <span class='logo-txt'>BiogenixCGM</span>
                            </div>
                            <h1 class='title'>Verify Your Email Address</h1>
                            <p>Hello <strong>{$name}</strong>,</p>
                            <p>Thank you for choosing BiogenixCGM. To complete your account registration, please enter the following One-Time Password (OTP) on the verification screen:</p>
                            
                            <div class='otp-box'>{$otp}</div>
                            
                            <p>This verification code is valid for <strong>15 minutes</strong>. For security reasons, please do not share this code with anyone.</p>
                            <p>If you did not request this code, you can safely ignore this email.</p>
                            
                            <div class='footer'>
                                This is an automated notification from BiogenixCGM.<br>
                                &copy; 2026 BiogenixCGM. All rights reserved.
                            </div>
                        </div>
                    </body>
                    </html>
                "
            ]);

            if ($response->failed()) {
                Log::error("Brevo API call failed: " . $response->body());
                return false;
            }

            return true;
        } catch (\Exception $e) {
            Log::error("Exception occurred while sending email via Brevo to {$email}: " . $e->getMessage());
            return false;
        }
    }
}
