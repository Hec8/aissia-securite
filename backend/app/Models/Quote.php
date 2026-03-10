<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'company_name',
        'contact_name',
        'email',
        'phone',
        'service_type',
        'description',
        'budget_min',
        'budget_max',
        'desired_start_date',
        'status',
        'admin_notes',
        'ncc',
        'rccm',
    ];

    protected $casts = [
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'desired_start_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quote) {
            if (empty($quote->reference)) {
                $quote->reference = 'DEV-' . date('Ymd') . '-' . strtoupper(Str::random(4));
            }
        });
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeInProgress($query)
    {
        return $query->whereIn('status', ['contacted', 'in_progress', 'quoted']);
    }
}
