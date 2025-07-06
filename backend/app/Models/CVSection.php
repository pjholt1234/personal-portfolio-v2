<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CVSection extends Model
{
    protected $table = 'cv_sections';
    protected $fillable = [
        'title',
        'subtitle',
        'bullets',
        'subsections',
        'order',
        'active'
    ];

    protected $casts = [
        'bullets' => 'array',
        'subsections' => 'array',
        'active' => 'boolean',
        'order' => 'integer'
    ];
}
