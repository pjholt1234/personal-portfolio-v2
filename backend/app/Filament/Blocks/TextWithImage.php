<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;

class TextWithImage extends AbstractBlock
{
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::TEXT_WITH_IMAGE);
    }

    public function getBlockSchema(): array
    {
        return [
            RichEditor::make('text')
                ->label('Text Content')
                ->required(),
            FileUpload::make('image')
                ->label('Image')
                ->image()
                ->required(),
            Select::make('image_position')
                ->label('Image Position')
                ->options([
                    'left' => 'Left',
                    'right' => 'Right',
                ])
                ->default('left')
                ->required(),
            TextInput::make('image_alt')
                ->label('Image Alt Text')
                ->required(),
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
            'text' => $this->getField($blockData, 'text'),
            'image' => asset('storage/' . $this->getField($blockData, 'image')),
            'image_position' => $this->getField($blockData, 'image_position'),
            'image_alt' => $this->getField($blockData, 'image_alt'),
        ];
    }
} 