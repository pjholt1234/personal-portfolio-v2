<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;


class Set extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::SET);
    }

    public function getBlockSchema(): array
    {
        return [
            Checkbox::make('pills')
                ->label('Pills')
                ->helperText('Use pills instead of bullet points')
                ->default(false)
                ->columnSpan(2),
            Repeater::make('set')
                ->label('Set')
                ->schema([
                    Textarea::make('text')
                        ->label('Text')
                        ->required(),
                ])
                ->columns(1)
                ->columnSpan(2),
        ];
    }

    /**
     * @throws BlockContentException
     */
    public function getResource(array $blockContent): array
    {
        $this->validateBlockContent($blockContent);
        $blockData = $blockContent['data'];

        return [
            'type' => $blockContent['type'],
            'eyebrow' => $this->getField($blockData, 'eyebrow'),
            'set' => $this->getSetField($blockData),
            'pills' => $this->getField($blockData, 'pills'),
        ];
    }

    private function getSetField(array $blockData): array
    {
        $setField = $this->getField($blockData, 'set');
        $text = [];

        foreach($setField as $textItem) {
            $text[] = $this->getField($textItem, 'text');
        }

        return $text;
    }
}
