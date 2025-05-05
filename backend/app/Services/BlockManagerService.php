<?php

namespace App\Services;

use App\Enums\BlockTypesEnum;
use App\Exceptions\BlockTypeException;
use App\Filament\Blocks\BlockInterface;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;

class BlockManagerService
{
    private readonly Page|Project|Event $model;
    public function blocks(): array
    {
        $blocks = $this->getBlocks();
        $blockSchema = [];

        foreach($blocks as $blockType => $block) {
            $blockSchema[] = $block->getBlock();
        }

        return $blockSchema;
    }

    public function blocksApi(Page|Project|Event $model): array
    {
        $this->model = $model;
        if(empty($model->content)) {
            return [];
        }

        $blocks = $this->getBlocks();
        $blockSchema = [];

        foreach($model->content as $item){
            $blockType = $item['type'] ?? null;

            if(!isset($blocks[$blockType])) {
                throw new BlockTypeException('Block type ' . $blockType . ' not found');
            }

            /* @var BlockInterface $blockClass */
            $blockClass = $blocks[$blockType];
            $blockSchema[] = $blockClass->getResource($model, $item);
        }

        return $blockSchema;
    }

    private function getBlocks(): array
    {
        $blocks = [];
        $namespace = 'App\\Filament\\Blocks';
        $directory = app_path('Filament/Blocks');

        foreach (scandir($directory) as $file) {
            if(!$this->isFileValid($file)) {
                continue;
            }

            $className = $namespace . '\\' . pathinfo($file, PATHINFO_FILENAME);

            if(!$this->isClassValid($className)) {
                continue;
            }

            /* @var BlockInterface $blockClass */
            $blockClass = new $className();

            $blocks[$blockClass->getBlockType()] = $blockClass;
        }

        return $blocks;
    }

    private function isFileValid(string $file): bool
    {
        return pathinfo($file, PATHINFO_EXTENSION) === 'php';
    }

    private function isClassValid(string $className): bool
    {
        if (!class_exists($className)) {
            return false;
        }

        $reflection = new \ReflectionClass($className);

        if (!$reflection->implementsInterface(BlockInterface::class) || $reflection->isAbstract()) {
            return false;
        }

        return true;
    }
}
