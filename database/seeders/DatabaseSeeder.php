<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\PaymentSetting;
use App\Models\Product;
use App\Models\ProductComparisonItem;
use App\Models\ProductFeature;
use App\Models\ProductSpecification;
use App\Models\RedirectLink;
use App\Models\ShippingCharge;
use App\Models\SiteSetting;
use App\Models\SupportResource;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (app()->environment(['local', 'testing'])) {
            // Demo accounts must never be seeded in production.
            User::create([
                'name' => 'System Admin',
                'email' => 'admin@biogenixCGM.local',
                'password' => Hash::make('Admin@12345.'),
                'role' => 'admin',
            ]);

            User::create([
                'name' => 'Test Customer',
                'email' => 'customer@test.com',
                'phone' => '9876543210',
                'password' => Hash::make('password'),
                'role' => 'customer',
            ]);
        }

        // ── Products ──────────────────────────────────────────────
        $biogenix = Product::create([
            'name' => 'biogenixCGM',
            'slug' => 'biogenix-cgm',
            'short_description' => 'Our flagship 14-day continuous glucose monitor delivers real-time readings and intelligent alerts directly to your smartphone — no finger-pricks required.',
            'long_description' => '<p>The biogenixCGM is a next-generation continuous glucose monitoring system designed to give you complete visibility into your glucose levels around the clock. A slim, water-resistant sensor is applied just beneath the skin and pairs wirelessly with the biogenixCGM mobile app to deliver real-time glucose data, trend arrows, and customizable high/low alerts.</p><p>With a 14-day sensor life and factory calibration, the biogenixCGM eliminates the need for routine finger-prick calibrations. Its predictive urgent-low alert can warn you up to 20 minutes before a severe hypoglycemic event, giving you time to act. Share your data with up to 10 followers — family, caregivers, or your healthcare team — for collaborative diabetes management.</p><p>Whether you are newly diagnosed or an experienced insulin user, the biogenixCGM integrates seamlessly with compatible insulin pumps and smart pens, making it the cornerstone of a connected diabetes ecosystem.</p>',
            'image_url' => '/images/biogenix-cgm.png',
            'price' => 4999.00,
            'sale_price' => 3999.00,
            'stock' => 50,
            'status' => 'active',
            'display_order' => 1,
        ]);

        $apex = Product::create([
            'name' => 'Apex Patch Pump',
            'slug' => 'apex-patch-pump',
            'short_description' => 'A discreet, tubeless insulin delivery system that adheres directly to your skin — providing precise basal and bolus dosing with smartphone control.',
            'long_description' => '<p>The Apex Patch Pump redefines insulin delivery with a tubeless, waterproof design that fits unobtrusively on your body. Weighing less than 30 grams when filled, the pod attaches with medical-grade adhesive and delivers both basal and on-demand bolus insulin controlled entirely through the Apex companion app.</p><p>Customizable basal programs let you set different rates for daytime, nighttime, and exercise. The integrated bolus calculator factors in your insulin-on-board, carbohydrate ratio, and correction factor to recommend precise doses. A built-in safety system prevents accidental double-bolusing and alerts you to occlusions or empty reservoirs.</p><p>Each pod holds up to 200 units of rapid-acting insulin and lasts up to 72 hours before replacement. The Apex Patch Pump is compatible with the biogenixCGM for hybrid closed-loop functionality, automatically adjusting basal delivery based on real-time glucose trends.</p>',
            'image_url' => '/images/apex-patch-pump.png',
            'price' => 12999.00,
            'sale_price' => 10999.00,
            'stock' => 30,
            'status' => 'active',
            'display_order' => 2,
        ]);

        $horizon = Product::create([
            'name' => 'Horizon Smart Pen',
            'slug' => 'horizon-smart-pen',
            'short_description' => 'A connected reusable insulin pen that automatically logs every dose, calculates active insulin, and syncs with your glucose data for smarter decisions.',
            'long_description' => '<p>The Horizon Smart Pen bridges the gap between traditional injection therapy and modern connected care. This sleek, reusable pen accepts standard insulin cartridges and uses a precision dose sensor to automatically record every injection — dose amount, time, and insulin type — without any manual logging.</p><p>The companion Horizon app displays your dose history alongside glucose data from the biogenixCGM (or manual entries), helping you and your clinician spot patterns, optimize timing, and reduce missed doses. The active-insulin calculator shows how much insulin is still working in your body, helping prevent dangerous dose stacking.</p><p>Built from medical-grade aluminum with a rechargeable battery lasting up to 12 months, the Horizon Smart Pen is designed for everyday durability. Compatible with all major rapid-acting and long-acting insulin cartridges.</p>',
            'image_url' => '/images/horizon-smart-pen.png',
            'price' => 3499.00,
            'sale_price' => null,
            'stock' => 100,
            'status' => 'active',
            'display_order' => 3,
        ]);

        // ── Product Features ──────────────────────────────────────
        $biogenixFeatures = [
            ['icon' => 'Activity', 'title' => 'Real-Time Glucose Readings', 'description' => 'See your glucose level updated every 5 minutes with trend arrows showing where your levels are heading.', 'display_order' => 1],
            ['icon' => 'Shield', 'title' => 'Predictive Urgent-Low Alert', 'description' => 'Receive a warning up to 20 minutes before a severe low, giving you time to take action and stay safe.', 'display_order' => 2],
            ['icon' => 'Smartphone', 'title' => 'Smartphone Integration', 'description' => 'View readings, trends, and reports directly in the biogenixCGM app on iOS and Android. No separate receiver needed.', 'display_order' => 3],
            ['icon' => 'Clock', 'title' => '14-Day Sensor Life', 'description' => 'Each sensor lasts a full 14 days with factory calibration — no finger-prick calibrations required.', 'display_order' => 4],
            ['icon' => 'Users', 'title' => 'Share With 10 Followers', 'description' => 'Invite family, caregivers, or your care team to follow your glucose data in real time for added peace of mind.', 'display_order' => 5],
            ['icon' => 'Droplets', 'title' => 'Water-Resistant Design', 'description' => 'Wear your sensor in the shower, pool, or ocean — rated IP28 for submersion up to 2.4 meters for 24 hours.', 'display_order' => 6],
        ];
        foreach ($biogenixFeatures as $f) {
            ProductFeature::create(array_merge($f, ['product_id' => $biogenix->id]));
        }

        $apexFeatures = [
            ['icon' => 'Zap', 'title' => 'Tubeless Freedom', 'description' => 'No tubing means no snagging, no threading, and nothing to hide under your clothes. Just apply and go.', 'display_order' => 1],
            ['icon' => 'Smartphone', 'title' => 'Full Smartphone Control', 'description' => 'Program basal rates, deliver boluses, and review history — all from the Apex app on your phone.', 'display_order' => 2],
            ['icon' => 'Calculator', 'title' => 'Built-In Bolus Calculator', 'description' => 'Factors in insulin-on-board, carb ratio, and correction factor to suggest the right dose every time.', 'display_order' => 3],
            ['icon' => 'RefreshCw', 'title' => 'Hybrid Closed-Loop Ready', 'description' => 'Pair with the biogenixCGM to enable automatic basal adjustments based on real-time glucose trends.', 'display_order' => 4],
            ['icon' => 'Shield', 'title' => 'Safety Lockouts', 'description' => 'Prevents accidental double-bolusing and alerts you to occlusions, empty reservoirs, or pod expiration.', 'display_order' => 5],
        ];
        foreach ($apexFeatures as $f) {
            ProductFeature::create(array_merge($f, ['product_id' => $apex->id]));
        }

        $horizonFeatures = [
            ['icon' => 'PenTool', 'title' => 'Automatic Dose Logging', 'description' => 'Every injection is recorded automatically — dose amount, time, and type — with zero manual effort.', 'display_order' => 1],
            ['icon' => 'BarChart3', 'title' => 'Active-Insulin Calculator', 'description' => 'See how much insulin is still working in your body to avoid dangerous dose stacking.', 'display_order' => 2],
            ['icon' => 'Smartphone', 'title' => 'Companion App & Reports', 'description' => 'Review dose history alongside glucose data, spot patterns, and share PDF reports with your clinician.', 'display_order' => 3],
            ['icon' => 'Battery', 'title' => '12-Month Battery Life', 'description' => 'A single USB-C charge cycle powers the pen for up to 12 months of daily use.', 'display_order' => 4],
            ['icon' => 'Heart', 'title' => 'Universal Cartridge Fit', 'description' => 'Compatible with all major rapid-acting and long-acting 3 mL insulin cartridges.', 'display_order' => 5],
        ];
        foreach ($horizonFeatures as $f) {
            ProductFeature::create(array_merge($f, ['product_id' => $horizon->id]));
        }

        // ── Product Specifications ────────────────────────────────
        $biogenixSpecs = [
            ['group' => 'Sensor', 'label' => 'Wear Duration', 'value' => '14 days', 'display_order' => 1],
            ['group' => 'Sensor', 'label' => 'Warm-Up Time', 'value' => '60 minutes', 'display_order' => 2],
            ['group' => 'Sensor', 'label' => 'Calibration', 'value' => 'Factory calibrated — no finger-pricks', 'display_order' => 3],
            ['group' => 'Sensor', 'label' => 'Water Resistance', 'value' => 'IP28 — 2.4 m for 24 hours', 'display_order' => 4],
            ['group' => 'Transmitter', 'label' => 'Connection', 'value' => 'Bluetooth Low Energy 5.0', 'display_order' => 5],
            ['group' => 'Transmitter', 'label' => 'Range', 'value' => 'Up to 6 meters (20 feet)', 'display_order' => 6],
            ['group' => 'App', 'label' => 'Platforms', 'value' => 'iOS 15+ and Android 10+', 'display_order' => 7],
            ['group' => 'App', 'label' => 'Data Sharing', 'value' => 'Up to 10 followers', 'display_order' => 8],
            ['group' => 'General', 'label' => 'Approved Ages', 'value' => '2 years and older', 'display_order' => 9],
            ['group' => 'General', 'label' => 'Measurement Range', 'value' => '40–400 mg/dL', 'display_order' => 10],
        ];
        foreach ($biogenixSpecs as $s) {
            ProductSpecification::create(array_merge($s, ['product_id' => $biogenix->id]));
        }

        $apexSpecs = [
            ['group' => 'Pod', 'label' => 'Reservoir Capacity', 'value' => '200 units', 'display_order' => 1],
            ['group' => 'Pod', 'label' => 'Pod Life', 'value' => 'Up to 72 hours', 'display_order' => 2],
            ['group' => 'Pod', 'label' => 'Weight (Filled)', 'value' => '< 30 grams', 'display_order' => 3],
            ['group' => 'Pod', 'label' => 'Water Resistance', 'value' => 'IP28 — 7.6 m for 60 minutes', 'display_order' => 4],
            ['group' => 'Delivery', 'label' => 'Basal Rate Range', 'value' => '0.05 – 30 U/hr', 'display_order' => 5],
            ['group' => 'Delivery', 'label' => 'Bolus Increment', 'value' => '0.05 units', 'display_order' => 6],
            ['group' => 'Delivery', 'label' => 'Max Bolus', 'value' => '30 units', 'display_order' => 7],
            ['group' => 'App', 'label' => 'Platforms', 'value' => 'iOS 15+ and Android 10+', 'display_order' => 8],
            ['group' => 'General', 'label' => 'Approved Ages', 'value' => '6 years and older', 'display_order' => 9],
        ];
        foreach ($apexSpecs as $s) {
            ProductSpecification::create(array_merge($s, ['product_id' => $apex->id]));
        }

        $horizonSpecs = [
            ['group' => 'Pen', 'label' => 'Material', 'value' => 'Medical-grade aluminum', 'display_order' => 1],
            ['group' => 'Pen', 'label' => 'Dose Range', 'value' => '1 – 80 units in 1-unit increments', 'display_order' => 2],
            ['group' => 'Pen', 'label' => 'Cartridge', 'value' => 'Standard 3 mL penfill', 'display_order' => 3],
            ['group' => 'Pen', 'label' => 'Battery', 'value' => 'Rechargeable USB-C — lasts 12 months', 'display_order' => 4],
            ['group' => 'Connectivity', 'label' => 'Connection', 'value' => 'Bluetooth Low Energy 5.0', 'display_order' => 5],
            ['group' => 'Connectivity', 'label' => 'App Platforms', 'value' => 'iOS 15+ and Android 10+', 'display_order' => 6],
            ['group' => 'General', 'label' => 'Approved Ages', 'value' => '12 years and older', 'display_order' => 7],
            ['group' => 'General', 'label' => 'Weight', 'value' => '38 grams (without cartridge)', 'display_order' => 8],
        ];
        foreach ($horizonSpecs as $s) {
            ProductSpecification::create(array_merge($s, ['product_id' => $horizon->id]));
        }

        // ── Comparison Items ──────────────────────────────────────
        $comparisonData = [
            ['category' => 'General', 'label' => 'Device Type', 'values' => ['Continuous Glucose Monitor', 'Tubeless Insulin Pump', 'Smart Insulin Pen'], 'highlights' => [false, false, false]],
            ['category' => 'General', 'label' => 'Approved Ages', 'values' => ['2+ years', '6+ years', '12+ years'], 'highlights' => [true, false, false]],
            ['category' => 'General', 'label' => 'Prescription Required', 'values' => ['Yes', 'Yes', 'No'], 'highlights' => [false, false, true]],
            ['category' => 'Wearability', 'label' => 'Wear Duration', 'values' => ['14 days', 'Up to 72 hours', 'Reusable — 12-month battery'], 'highlights' => [true, false, true]],
            ['category' => 'Wearability', 'label' => 'Water Resistant', 'values' => ['Yes — IP28', 'Yes — IP28', 'Splash-proof only'], 'highlights' => [true, true, false]],
            ['category' => 'Wearability', 'label' => 'Tubeless / Wireless', 'values' => ['Wireless sensor', 'Tubeless pod', 'N/A'], 'highlights' => [true, true, false]],
            ['category' => 'Features', 'label' => 'Smartphone App', 'values' => ['Yes', 'Yes', 'Yes'], 'highlights' => [false, false, false]],
            ['category' => 'Features', 'label' => 'Real-Time Alerts', 'values' => ['Yes — predictive', 'Yes — occlusion & low reservoir', 'Missed-dose reminder'], 'highlights' => [true, false, false]],
            ['category' => 'Features', 'label' => 'Data Sharing', 'values' => ['Up to 10 followers', 'Clinician reports', 'Clinician reports'], 'highlights' => [true, false, false]],
            ['category' => 'Technology', 'label' => 'Closed-Loop Compatible', 'values' => ['Yes — with Apex Pump', 'Yes — with biogenixCGM', 'No'], 'highlights' => [true, true, false]],
            ['category' => 'Technology', 'label' => 'Automatic Dose Logging', 'values' => ['N/A', 'Yes', 'Yes'], 'highlights' => [false, true, true]],
        ];
        $products = [$biogenix, $apex, $horizon];
        foreach ($comparisonData as $row) {
            foreach ($products as $i => $p) {
                ProductComparisonItem::create([
                    'product_id' => $p->id,
                    'category' => $row['category'],
                    'label' => $row['label'],
                    'value' => $row['values'][$i],
                    'highlight' => $row['highlights'][$i],
                ]);
            }
        }

        // ── Redirect Links ────────────────────────────────────────
        foreach ($products as $p) {
            RedirectLink::create([
                'product_id' => $p->id,
                'label' => 'Buy on biogenixCGM Store',
                'destination_url' => 'https://store.biogenixcgm.com/products/' . $p->slug,
                'campaign_code' => 'website_product_page',
                'link_key' => 'direct',
                'is_active' => true,
            ]);
            RedirectLink::create([
                'product_id' => $p->id,
                'label' => 'Buy on Amazon',
                'destination_url' => 'https://www.amazon.com/dp/BIOGENIXCGM' . strtoupper(str_replace('-', '', $p->slug)),
                'campaign_code' => 'website_amazon',
                'link_key' => 'amazon',
                'is_active' => true,
            ]);
        }

        // ── FAQs (Product-Specific) ──────────────────────────────
        $biogenixFaqs = [
            ['question' => 'Does the biogenixCGM require finger-prick calibrations?', 'answer' => 'No. The biogenixCGM is factory calibrated, meaning it is ready to provide accurate glucose readings from the moment the 60-minute warm-up period ends. No routine finger-prick calibrations are needed.', 'category' => 'Product', 'display_order' => 1],
            ['question' => 'Can I wear the biogenixCGM while swimming?', 'answer' => 'Yes. The sensor is rated IP28, meaning it can be submerged in up to 2.4 meters of water for 24 hours. You can shower, swim, and exercise without removing your sensor.', 'category' => 'Product', 'display_order' => 2],
            ['question' => 'How does the predictive urgent-low alert work?', 'answer' => 'The biogenixCGM uses a proprietary algorithm to analyze your glucose trend and rate of change. If it predicts your glucose will fall below 55 mg/dL within the next 20 minutes, it sends an urgent alert to your phone and all connected followers.', 'category' => 'Product', 'display_order' => 3],
            ['question' => 'Is the biogenixCGM covered by insurance?', 'answer' => 'The biogenixCGM is covered by most major commercial insurance plans, Medicare, and many state Medicaid programs. Our dedicated insurance support team can help verify your coverage and assist with prior authorization.', 'category' => 'Insurance', 'display_order' => 4],
        ];
        foreach ($biogenixFaqs as $f) {
            Faq::create(array_merge($f, ['product_id' => $biogenix->id]));
        }

        $apexFaqs = [
            ['question' => 'How long does each Apex pod last?', 'answer' => 'Each Apex pod can be worn for up to 72 hours (3 days) and holds up to 200 units of rapid-acting insulin. The app will remind you when it is time to change your pod.', 'category' => 'Product', 'display_order' => 1],
            ['question' => 'Can I control the Apex Patch Pump from my phone?', 'answer' => 'Yes. The Apex companion app gives you full control — set basal programs, deliver boluses, review delivery history, and receive alerts, all from your iOS or Android device.', 'category' => 'Product', 'display_order' => 2],
            ['question' => 'What happens if the pod gets an occlusion?', 'answer' => 'The Apex Patch Pump includes an integrated occlusion detection system. If insulin delivery is blocked, the pod will alarm and the app will display step-by-step instructions for replacing the pod safely.', 'category' => 'Support', 'display_order' => 3],
        ];
        foreach ($apexFaqs as $f) {
            Faq::create(array_merge($f, ['product_id' => $apex->id]));
        }

        $horizonFaqs = [
            ['question' => 'Which insulin cartridges work with the Horizon Smart Pen?', 'answer' => 'The Horizon Smart Pen accepts all standard 3 mL penfill cartridges, including major rapid-acting insulins (lispro, aspart, glulisine) and long-acting insulins (glargine, detemir, degludec).', 'category' => 'Product', 'display_order' => 1],
            ['question' => 'How does the Horizon Smart Pen record doses automatically?', 'answer' => 'A precision hall-effect sensor inside the pen detects the exact rotation of the dose dial. When you press the injection button, the pen records the dose amount, timestamp, and insulin type, then syncs to your app via Bluetooth.', 'category' => 'Product', 'display_order' => 2],
            ['question' => 'Do I need a prescription for the Horizon Smart Pen?', 'answer' => 'No. The Horizon Smart Pen is an over-the-counter reusable pen device. However, the insulin cartridges used with the pen do require a prescription from your healthcare provider.', 'category' => 'Product', 'display_order' => 3],
        ];
        foreach ($horizonFaqs as $f) {
            Faq::create(array_merge($f, ['product_id' => $horizon->id]));
        }

        // ── FAQs (General) ────────────────────────────────────────
        $generalFaqs = [
            ['question' => 'What is continuous glucose monitoring (CGM)?', 'answer' => 'Continuous glucose monitoring is a method of tracking glucose levels in real time throughout the day and night. A small sensor inserted just under the skin measures glucose in interstitial fluid and sends readings to a smartphone app or receiver every few minutes. CGM provides a more complete picture of glucose patterns compared to traditional finger-prick blood glucose meters.', 'category' => 'General', 'display_order' => 1],
            ['question' => 'How do I get started with biogenixCGM products?', 'answer' => 'Start by exploring our product pages to find the device that fits your needs. You can compare products side by side on our Compare page. When you are ready, click "Request Information" to connect with our team, or use the "Buy on Main Store" button to purchase through our official channels.', 'category' => 'General', 'display_order' => 2],
            ['question' => 'Are biogenixCGM products covered by insurance?', 'answer' => 'Most biogenixCGM products are covered by major commercial insurance plans, Medicare, and many state Medicaid programs. Coverage varies by product, plan, and region. Contact our insurance support team at 1-800-BIOGENIXCGM-1 or submit a coverage inquiry through our contact form for personalized assistance.', 'category' => 'Insurance', 'display_order' => 3],
            ['question' => 'How do I contact biogenixCGM customer support?', 'answer' => 'Our support team is available 24/7 by phone at 1-800-BIOGENIXCGM-1, by email at support@biogenixcgm.com, or through the live chat feature in the biogenixCGM app. For non-urgent inquiries, you can also submit a request through our Contact page.', 'category' => 'Support', 'display_order' => 4],
            ['question' => 'Can my healthcare provider access my data?', 'answer' => 'Yes. With your permission, you can share reports and real-time data with your healthcare provider through the biogenixCGM Clinic Portal. Your provider can view trends, statistics, and glucose patterns to help optimize your therapy during appointments.', 'category' => 'General', 'display_order' => 5],
            ['question' => 'Is my personal health data secure?', 'answer' => 'Absolutely. biogenixCGM uses industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. We comply with HIPAA, GDPR, and applicable local privacy regulations. We never sell your personal health data to third parties. You can review our full Privacy Policy for details.', 'category' => 'General', 'display_order' => 6],
        ];
        foreach ($generalFaqs as $f) {
            Faq::create(array_merge($f, ['product_id' => null]));
        }

        // ── Resources ─────────────────────────────────────────────
        $resourceData = [
            ['title' => 'biogenixCGM Quick Start Guide', 'type' => 'guide', 'file_url' => '#', 'product_id' => $biogenix->id],
            ['title' => 'biogenixCGM User Manual', 'type' => 'manual', 'file_url' => '#', 'product_id' => $biogenix->id],
            ['title' => 'biogenixCGM Sensor Application Video', 'type' => 'video', 'external_url' => '#', 'product_id' => $biogenix->id],
            ['title' => 'Apex Patch Pump Quick Start Guide', 'type' => 'guide', 'file_url' => '#', 'product_id' => $apex->id],
            ['title' => 'Apex Patch Pump User Manual', 'type' => 'manual', 'file_url' => '#', 'product_id' => $apex->id],
            ['title' => 'Apex Pod Change Video Tutorial', 'type' => 'video', 'external_url' => '#', 'product_id' => $apex->id],
            ['title' => 'Horizon Smart Pen Setup Guide', 'type' => 'guide', 'file_url' => '#', 'product_id' => $horizon->id],
            ['title' => 'Horizon Smart Pen User Manual', 'type' => 'manual', 'file_url' => '#', 'product_id' => $horizon->id],
            ['title' => 'Understanding Your Glucose Reports', 'type' => 'guide', 'file_url' => '#', 'product_id' => null],
            ['title' => 'Insurance & Coverage Guide', 'type' => 'document', 'file_url' => '#', 'product_id' => null],
        ];
        foreach ($resourceData as $r) {
            SupportResource::create(array_merge($r, ['is_public' => true]));
        }

        // ── Blog Posts ────────────────────────────────────────────
        BlogPost::create([
            'title' => 'Understanding Time in Range: Why It Matters More Than A1C Alone',
            'slug' => 'understanding-time-in-range',
            'excerpt' => 'Learn why Time in Range (TIR) has become the gold-standard metric for glucose management and how CGM technology makes it easy to track.',
            'body' => '<h2>What Is Time in Range?</h2><p>Time in Range (TIR) measures the percentage of time your glucose levels stay within a target range — typically 70–180 mg/dL for most adults with diabetes. Unlike A1C, which provides a 2-3 month average, TIR gives you a day-by-day, even hour-by-hour, picture of your glucose control.</p><h2>Why TIR Is Gaining Clinical Importance</h2><p>Research published in <em>Diabetes Care</em> has shown that every 10% improvement in TIR is associated with meaningful reductions in diabetes-related complications. International consensus guidelines now recommend that most adults with Type 1 or Type 2 diabetes aim for a TIR of at least 70%.</p><h2>How CGM Helps You Improve TIR</h2><p>Continuous glucose monitors like the biogenixCGM make TIR actionable. By providing real-time feedback, trend arrows, and historical reports, CGM users can see exactly when and why their glucose leaves the target range — and adjust meals, activity, or insulin doses accordingly.</p><p>Talk to your healthcare provider about incorporating TIR into your diabetes management plan.</p>',
            'category' => 'Education',
            'author' => 'Dr. Sarah Chen, MD',
            'reviewer' => 'Dr. Michael Torres, Endocrinologist',
            'published_at' => now()->subDays(5),
        ]);

        BlogPost::create([
            'title' => 'Traveling with Diabetes Technology: A Complete Guide',
            'slug' => 'traveling-with-diabetes-technology',
            'excerpt' => 'Planning a trip? Here is everything you need to know about traveling with your CGM, insulin pump, and smart pen — from airport security to time zone changes.',
            'body' => '<h2>Before You Leave</h2><p>Pack at least double the supplies you expect to need. Store insulin in a temperature-controlled case and carry all prescriptions and a doctor\'s letter explaining your medical devices. Ensure your CGM and pump apps are updated to the latest version.</p><h2>Airport Security Tips</h2><p>The biogenixCGM and Apex Patch Pump are safe to wear through metal detectors. However, do not send them through X-ray machines or full-body scanners. Request a manual pat-down inspection instead. Carry a TSA notification card to streamline the process.</p><h2>Crossing Time Zones</h2><p>If you cross more than 2 time zones, you may need to adjust your basal insulin schedule. CGM readings adjust automatically, but pump basal programs should be updated to match local time. Work with your endocrinologist to create a time-zone adjustment plan before departure.</p><h2>Emergency Contacts</h2><p>Save the biogenixCGM 24/7 support number (1-800-BIOGENIXCGM-1) in your phone and keep a printed copy in your luggage. Our team can assist with device troubleshooting, emergency supply shipments, and clinical guidance in any time zone.</p>',
            'category' => 'Lifestyle',
            'author' => 'Emma Rodriguez, CDE',
            'reviewer' => 'Dr. Sarah Chen, MD',
            'published_at' => now()->subDays(12),
        ]);

        BlogPost::create([
            'title' => 'How Hybrid Closed-Loop Systems Are Changing Diabetes Care',
            'slug' => 'hybrid-closed-loop-systems',
            'excerpt' => 'Discover how the integration of CGM and insulin pump technology is automating glucose management and reducing the daily burden of diabetes.',
            'body' => '<h2>What Is a Hybrid Closed-Loop System?</h2><p>A hybrid closed-loop (HCL) system combines a continuous glucose monitor and an insulin pump to automatically adjust basal insulin delivery based on real-time glucose readings. The "hybrid" term means that while basal delivery is automated, users still need to manually bolus for meals.</p><h2>The biogenixCGM + Apex Integration</h2><p>When paired together, the biogenixCGM sends glucose data to the Apex Patch Pump every 5 minutes. The pump\'s algorithm analyzes trends and predicts where glucose is heading, increasing or decreasing basal delivery to keep levels in range. In clinical trials, users saw a 15% improvement in Time in Range compared to standalone pump therapy.</p><h2>Who Benefits Most?</h2><p>HCL systems are particularly valuable for people who experience frequent overnight lows, have high glucose variability, or want to reduce the mental burden of constant diabetes management decisions. The automated adjustments continue working even while you sleep.</p><p>Ask your endocrinologist if a hybrid closed-loop system is right for your diabetes management plan.</p>',
            'category' => 'Technology',
            'author' => 'Dr. James Park, PhD',
            'reviewer' => 'Dr. Lisa Nguyen, Endocrinologist',
            'published_at' => now()->subDays(20),
        ]);

        BlogPost::create([
            'title' => 'Managing Type 2 Diabetes: When to Consider CGM Technology',
            'slug' => 'type-2-diabetes-cgm',
            'excerpt' => 'CGM is not just for Type 1. Learn when people with Type 2 diabetes can benefit from continuous glucose monitoring and how to talk to your doctor about it.',
            'body' => '<h2>CGM Beyond Type 1</h2><p>While continuous glucose monitoring was originally developed for people with Type 1 diabetes, clinical evidence now supports its use in Type 2 diabetes as well — particularly for those on intensive insulin therapy, experiencing hypoglycemia, or struggling to reach A1C targets.</p><h2>When Your Doctor Might Recommend CGM</h2><p>Your healthcare provider may suggest CGM if you are on multiple daily insulin injections, have experienced severe hypoglycemia, are not meeting your glucose targets despite medication adjustments, or want more detailed data to guide lifestyle changes.</p><h2>What the Research Shows</h2><p>A landmark study in the <em>Annals of Internal Medicine</em> found that adults with Type 2 diabetes on basal insulin who used CGM achieved a 0.4% greater A1C reduction compared to those using traditional blood glucose meters alone. Participants also spent significantly less time in hypoglycemia.</p><p>Talk to your doctor about whether CGM could be a valuable addition to your Type 2 diabetes management plan.</p>',
            'category' => 'Education',
            'author' => 'Dr. Sarah Chen, MD',
            'reviewer' => 'Dr. Michael Torres, Endocrinologist',
            'published_at' => now()->subDays(30),
        ]);

        // ── Site Settings ─────────────────────────────────────────
        $settings = [
            ['key' => 'brand_name', 'value' => 'biogenixCGM'],
            ['key' => 'brand_tagline', 'value' => 'Advanced Diabetes Management, Simplified'],
            ['key' => 'contact_email', 'value' => 'support@biogenixcgm.com'],
            ['key' => 'contact_phone', 'value' => '1-800-BIOGENIXCGM-1'],
            ['key' => 'contact_address', 'value' => '200 Innovation Drive, Suite 400, San Diego, CA 92121'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/biogenixcgm'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/biogenixcgm'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/biogenixcgm'],
            ['key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/biogenixcgm'],
            ['key' => 'safety_text', 'value' => 'biogenixCGM products are medical devices. Please read all warnings and instructions for use before using any biogenixCGM product. Consult your healthcare provider to determine if a biogenixCGM product is right for you.'],
        ];
        foreach ($settings as $s) {
            SiteSetting::create($s);
        }

        // ── Shipping Charges ──────────────────────────────────────
        ShippingCharge::create([
            'zone' => 'Uttar Pradesh',
            'min_pincode' => '200000',
            'max_pincode' => '285999',
            'charge' => 49.00,
            'is_active' => true,
        ]);
        ShippingCharge::create([
            'zone' => 'Rest of India',
            'min_pincode' => '100000',
            'max_pincode' => '999999',
            'charge' => 99.00,
            'is_active' => true,
        ]);

        // ── Payment Settings ──────────────────────────────────────
        PaymentSetting::create([
            'qr_code_image' => null,
            'upi_id' => 'pay@biogenixcgm',
            'payment_instructions' => 'Scan the QR code or use the UPI ID above to make your payment. After completing the payment, enter your transaction ID in the field below and click Submit Order.',
        ]);
    }
}
