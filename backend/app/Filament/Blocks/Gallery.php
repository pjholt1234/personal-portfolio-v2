<?php

namespace App\Filament\Blocks;

use App\Exceptions\BlockContentException;
use config\BlockTypesEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;


class Gallery extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::GALLERY);
    }

    public function getBlockSchema(): array
    {
        return [
            FileUpload::make('images')
                ->label('Images')
                ->image()
                ->required()
                ->multiple()
                ->minFiles(2)
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
            'image_urls' => $this->getImageUrls($blockData),
        ];
    }

    private function getImageUrls(array $blockData): array
    {
        $imagesField = $this->getField($blockData, 'images');
        $imageUrls = [];

        foreach($imagesField as $imageFileName) {
            $imageUrls[] = $imageFileName ? asset('storage/' . $imageFileName) : null;
        }

        return $imageUrls;
    }
}
