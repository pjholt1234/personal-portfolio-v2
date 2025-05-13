<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    use InteractsWithMedia;

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
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'content' => 'json',
        'media' => 'array',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    public function files(): MorphToMany
    {
        return $this->morphToMany(File::class, 'fileable');
    }
}
