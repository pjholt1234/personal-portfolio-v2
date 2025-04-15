<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;

abstract class AbstractBlock implements BlockInterface
{
    protected BlockTypesEnum $type;
    protected int $columns = 1;

    public function __construct(BlockTypesEnum $type)
    {
        $this->type = $type;
    }

    public function getBlockType(): string
    {
        return $this->type->name;
    }

    public function getBlock(): Block
    {
        return Block::make($this->type->name)
            ->label(ucfirst($this->type->value))
            ->schema([
                TextInput::make('eyebrow')
                    ->label('Eyebrow')
                    ->nullable(),
                ...$this->getBlockSchema(),
            ])->columns($this->columns);
    }

    protected function validateBlockContent(array $blockContent): void
    {
        if (empty($blockContent)) {
            throw new BlockContentException('Block content cannot be empty');
        }

        if (empty($blockContent['data']) || empty($blockContent['type'])) {
            throw new BlockContentException('Missing data or type in block content');
        }
    }

    protected function getField(array $blockData, array | string $location): null | string | array
    {
        if(is_string($location)) {
            $location = [$location];
        }

        foreach($location as $key) {
            if (array_key_exists($key, $blockData)) {
                $blockData = $blockData[$key];
            } else {
                return null;
            }
        }

        return $blockData;
    }
}
