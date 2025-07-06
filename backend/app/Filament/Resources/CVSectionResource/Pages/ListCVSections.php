<?php

namespace App\Filament\Resources\CVSectionResource\Pages;

use App\Filament\Resources\CVSectionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCVSections extends ListRecords
{
    protected static string $resource = CVSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
} 