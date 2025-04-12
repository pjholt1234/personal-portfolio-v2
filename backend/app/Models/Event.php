<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'type',
        'icon',
        'description',
        'description_long',
        'start_date',
        'end_date',
        'content'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
