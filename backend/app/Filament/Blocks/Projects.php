<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use App\Exceptions\BlockTypeException;
use App\Http\Resources\ProjectResource;
use Filament\Forms\Components\Placeholder;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;

class Projects extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::PROJECTS);
    }

    public function getBlockSchema(): array
    {
        return [
            Placeholder::make('')
                ->content('Automatically include related projects')
        ];
    }

    /**
     * @throws BlockContentException
     */
    public function getResource(Page|Project|Event $model, array $blockContent): array
    {
        if(!method_exists($model, 'projects')) {
            throw new BlockTypeException('Project blocks are not compatible with this model');
        }

        $this->validateBlockContent($blockContent);

        $blockData = $blockContent['data'];

        return [
            'type' => $blockContent['type'],
            'eyebrow' => $this->getField($blockData, 'eyebrow'),
            'projects' => ProjectResource::collection($model->projects),
        ];
    }
}
