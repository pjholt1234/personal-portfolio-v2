<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;

class Image extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::IMAGE);
    }

    public function getBlockSchema(): array
    {
        return [
            FileUpload::make('image')
                ->label('Image')
                ->image()
                ->required()
                ->columnSpan(2),
            TextInput::make('alt')
                ->label('Alt')
                ->columnSpan(2),
            TextInput::make('description')
                ->label('Description')
                ->nullable()
                ->columnSpan(2),
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
            'image' => [
                'alt' => $this->getField($blockData, 'alt'),
                'description' => $this->getField($blockData, 'description'),
                'image_url' => $this->getImageUrl($blockData),
            ]
        ];
    }

    private function getImageUrl(array $blockData): ?string
    {
        $imageField = $this->getField($blockData, 'image');
        return $imageField ? asset('storage/' . $this->getField($blockData, 'image')) : null;
    }
}
