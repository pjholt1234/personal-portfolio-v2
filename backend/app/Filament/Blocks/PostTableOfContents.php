<?php

namespace App\Filament\Blocks;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockContentException;
use App\Exceptions\BlockTypeException;
use App\Http\Resources\PostResource;
use Filament\Forms\Components\Placeholder;
use App\Models\Event;
use App\Models\Page;
use App\Models\Post;
use App\Models\Project;

class PostTableOfContents extends AbstractBlock {
    public function __construct()
    {
        parent::__construct(BlockTypesEnum::POST_TOC);
    }

    public function getBlockSchema(): array
    {
        return [
            Placeholder::make('')
                ->content('Automatically include posts from this project')
        ];
    }

    /**
     * @throws BlockContentException
     */
    public function getResource(Page|Project|Event|Post $model, array $blockContent): array
    {
        if(!($model instanceof Project)) {
            throw new BlockTypeException('Post Table of Contents blocks are only compatible with Project model');
        }

        $this->validateBlockContent($blockContent);

        $blockData = $blockContent['data'];

        $posts = $model->posts()
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        return [
            'type' => $blockContent['type'],
            'eyebrow' => $this->getField($blockData, 'eyebrow'),
            'posts' => PostResource::collection($posts),
            'project_slug' => $model->slug,
        ];
    }
}

