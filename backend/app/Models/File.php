<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class File extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        'name',
        'machine_name',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function events(): MorphToMany
    {
        return $this->morphedByMany(Event::class, 'fileable');
    }

    public function projects(): MorphToMany
    {
        return $this->morphedByMany(Project::class, 'fileable');
    }
}
