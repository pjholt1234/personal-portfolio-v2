<?php

namespace App\Filament\Blocks;

use App\Models\Event;
use App\Models\Page;
use App\Models\Project;
use Filament\Forms\Components\Builder\Block;

interface BlockInterface
{
    public function getBlock(): Block;

    public function getResource(Page|Project|Event $model, array $blockContent): array;
    public function getBlockType(): string;
}
