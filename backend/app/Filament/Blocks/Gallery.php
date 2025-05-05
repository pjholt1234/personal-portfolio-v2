<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;

class Gallery extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::GALLERY);
    }

    public function getBlockSchema(): array
    {
        return [
            Repeater::make('images')
                ->label('Images')
                ->schema([
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
                ])
                ->minItems(1)
                ->columns(1)
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
            'images' => $this->getImages($blockData),
        ];
    }

    private function getImages(array $blockData): array
    {
        $imagesField = $this->getField($blockData, 'images');
        $images = [];

        foreach($imagesField as $imageFileName) {
            $images[] = [
                'image_url' => asset('storage/' . $this->getField($imageFileName, 'image')),
                'alt' => $this->getField($imageFileName, 'alt'),
                'description' => $this->getField($imageFileName, 'description'),
            ];
        }

        return $images;
    }
}
