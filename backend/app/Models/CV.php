<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class CV extends Model
{
    public $timestamps = false;
    
    protected $primaryKey = 'filename';
    
    protected $keyType = 'string';
    
    public $incrementing = false;

    protected $fillable = [
        'filename',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public static function boot()
    {
        parent::boot();

        static::addGlobalScope('file_records', function (Builder $builder) {
            // This is a dummy query that will be replaced by our collection
            $builder->whereRaw('1 = 0');
        });
    }

    public function newEloquentBuilder($query)
    {
        return new class($query) extends Builder {
            public function get($columns = ['*'])
            {
                return new EloquentCollection(CV::getAllCVs());
            }
        };
    }

    public static function getAllCVs(): Collection
    {
        $files = Storage::disk('public')->files('cv');
        
        return collect($files)
            ->map(function ($file) {
                $filename = basename($file);
                // Extract timestamp from filename (format: cv_YYYY_MM_DD_HHmmss.pdf)
                preg_match('/cv_(\d{4}_\d{2}_\d{2}_\d{6})/', $filename, $matches);
                
                if (isset($matches[1])) {
                    $timestamp = $matches[1];
                    $created_at = Carbon::createFromFormat('Y_m_d_His', $timestamp);
                } else {
                    $created_at = Carbon::now(); // Fallback if pattern doesn't match
                }

                return new static([
                    'filename' => $filename,
                    'created_at' => $created_at,
                ]);
            })
            ->sortByDesc('created_at')
            ->values();
    }
} 