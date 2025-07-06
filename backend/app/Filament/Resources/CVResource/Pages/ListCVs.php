<?php

namespace App\Filament\Resources\CVResource\Pages;

use App\Filament\Resources\CVResource;
use App\Models\CV;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;

class ListCVs extends ListRecords
{
    protected static string $resource = CVResource::class;

    public function getTitle(): string|Htmlable
    {
        return 'CV Management';
    }

    protected function getTableQuery(): Builder
    {
        return CV::query();
    }
} 