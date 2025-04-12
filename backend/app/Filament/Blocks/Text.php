<?php

namespace App\Filament\Blocks;

use App\Exceptions\BlockContentException;
use config\BlockTypesEnum;
use Filament\Forms\Components\Textarea;


class Text extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::TEXT);
    }

    public function getBlockSchema(): array
    {
        return [
            Textarea::make('content')
                ->label('Text')
                ->required(),
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
            'content' => $this->getField($blockData, 'content'),
        ];
    }
}
