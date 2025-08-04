<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class CVBullet extends Model
{
    protected $table = 'cv_bullets';

    protected $fillable = [
        'content',
        'cv_bulletable_type',
        'cv_bulletable_id'
    ];

    public function cvBulletable(): MorphTo
    {
        return $this->morphTo();
    }
}
