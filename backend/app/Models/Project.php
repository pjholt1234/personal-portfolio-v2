<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
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
        'content',
        'slug',
        'github_link',
        'hidden',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'content' => 'json',
        'hidden' => 'boolean',
    ];


    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class);
    }
}
