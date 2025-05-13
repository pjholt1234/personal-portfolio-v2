<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;
use Filament\Forms\Components\TextInput;

class YoutubeEmbed extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::YOUTUBE);
    }

    public function getBlockSchema(): array
    {
        return [
            TextInput::make('youtube_url')
                ->label('Youtube URL')
                ->required()
                ->url()
                ->maxLength(255),
        ];
    }

    /**
     * @throws BlockContentException
     */
    public function getResource(Page|Project|Event $model, array $blockContent): array
    {
        $this->validateBlockContent($blockContent);
        $blockData = $blockContent['data'];

        return [
            'type' => $blockContent['type'],
            'eyebrow' => $this->getField($blockData, 'eyebrow'),
            'url' => $this->getField($blockData, 'youtube_url'),
        ];
    }
}
