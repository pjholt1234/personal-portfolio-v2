<?php

namespace App\Filament\Blocks;

use App\Exceptions\BlockContentException;
use config\BlockTypesEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;


class Image extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::IMAGE);
    }

    public function getBlockSchema(): array
    {
        return [
            TextInput::make('label')
                ->label('Label')
                ->nullable()
                ->columnSpan(2),
            FileUpload::make('image')
                ->label('Image')
                ->image()
                ->required()
                ->minFiles(1)
                ->maxFiles(1)
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
            'label' => $this->getField($blockData, 'label'),
            'image_url' => $this->getImageUrl($blockData),
        ];
    }

    private function getImageUrl(array $blockData): ?string
    {
        $imageField = $this->getField($blockData, 'image');
        return $imageField ? asset('storage/' . $this->getField($blockData, 'image')) : null;
    }
}
