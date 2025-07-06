<?php

namespace App\Filament\Resources\CVSectionResource\Pages;

use App\Filament\Resources\CVSectionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCVSection extends EditRecord
{
    protected static string $resource = CVSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
} 