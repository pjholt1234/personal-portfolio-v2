<?php

namespace App\Http\Controllers;

use App\Exceptions\BlockTypeException;
use App\Models\Event;
use App\Models\Page;
use App\Models\Project;
use App\Services\BlockManagerService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class BlockController extends Controller
{
    public function getBlocks(string $modelName, int $id, BlockManagerService $blockManagerService): JsonResponse
    {
        $modelMap = [
            'page' => Page::class,
            'project' => Project::class,
            'event' => Event::class,
        ];

        if (!array_key_exists($modelName, $modelMap)) {
            return response()->json(['error' => 'Invalid type provided.'], 400);
        }

        $modelClass = $modelMap[$modelName];

        try {
            $model = $modelClass::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            report($e);
            return response()->json(['error' => 'Resource not found.'], 404);
        }

        try {
            $blocks = $blockManagerService->blocksApi($model->content);
        } catch (BlockTypeException $e) {
            report($e);
            return response()->json(['error' => 'Invalid block type.'], 400);
        } catch (\Exception $e) {
            report($e);
            return response()->json(['error' => 'An error occurred while processing blocks.'], 500);
        }

        return response()->json([
            'blocks' => $blocks,
        ]);
    }
}
