<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PaymentSetting extends Model
{
    protected $fillable = ['qr_code_image', 'upi_id', 'payment_instructions'];
}
