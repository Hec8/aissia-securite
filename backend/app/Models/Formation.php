<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'level',
        'category',
        'duration_weeks',
        'modules',
        'has_final_exam',
        'price',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'modules' => 'array',
        'duration_weeks' => 'integer',
        'has_final_exam' => 'boolean',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($formation) {
            if (empty($formation->slug)) {
                $formation->slug = Str::slug($formation->title);
            }
        });

        static::updating(function ($formation) {
            if ($formation->isDirty('title') && !$formation->isDirty('slug')) {
                $formation->slug = Str::slug($formation->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('title');
    }
}
