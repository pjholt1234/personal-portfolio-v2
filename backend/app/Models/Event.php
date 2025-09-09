<?php

namespace App\Models;

use App\Enums\EventTypesEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
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
        'institution',
        'role',
        'reference_name',
        'reference_job_title',
        'reference_company',
        'reference_phone',
        'reference_email',
        'reference_relationship',
        'hidden',
        'hidden_from_cv'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'content' => 'array',
        'media' => 'array',
        'hidden' => 'boolean',
        'hidden_from_cv' => 'boolean',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    public function files(): MorphToMany
    {
        return $this->morphToMany(File::class, 'fileable');
    }

    public function cvBullets(): MorphMany
    {
        return $this->morphMany(CVBullet::class, 'cv_bulletable');
    }
}
