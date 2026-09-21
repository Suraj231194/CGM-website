<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipping_charges', function (Blueprint $table) {
            $table->id();
            $table->string('zone'); // UP, Rest of India
            $table->string('min_pincode', 10);
            $table->string('max_pincode', 10);
            $table->decimal('charge', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('shipping_charges'); }
};
