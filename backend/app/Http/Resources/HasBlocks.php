<?php

namespace App\Http\Resources;

use App\Exceptions\BlockTypeException;
use App\Services\BlockManagerService;

trait HasBlocks
{
    protected bool $withBlocks = false;

    public function withBlocks(): self
    {
        $this->withBlocks = true;
        return $this;
    }

    protected function addBlocksWhenRequested(array $data, string $contentField = 'content'): array
    {
        if (!$this->withBlocks) {
            return $data;
        }

        $blockManagerService = app(BlockManagerService::class);

        try {
            $data['blocks'] = $blockManagerService->blocksApi($this->resource);
        } catch (BlockTypeException $e) {
            report($e);
        }

        return $data;
    }
}
