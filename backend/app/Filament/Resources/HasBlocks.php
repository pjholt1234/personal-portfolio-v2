<?php

namespace App\Filament\Resources;

trait HasBlocks
{
    public static function getBlocks(): array
    {
        return app('blockManager')->blocks();
    }
}
