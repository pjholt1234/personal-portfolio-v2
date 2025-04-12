<?php

namespace App\Filament\Blocks;

use Filament\Forms\Components\Builder\Block;

interface BlockInterface
{
    public function getBlock(): Block;

    public function getResource(array $blockContent): array;
    public function getBlockType(): string;
}
