<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\MarkdownEditor;


class Snippet extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::SNIPPET);
    }

    public function getBlockSchema(): array
    {
        return [
            MarkdownEditor::make('content')
                ->toolbarButtons([
                    'codeBlock',
                ])
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
