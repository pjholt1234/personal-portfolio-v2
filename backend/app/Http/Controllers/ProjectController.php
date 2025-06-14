<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::query()
            ->where('hidden', false)
            ->get();

        return ProjectResource::collection($projects)->response();
    }

    public function show(Project $project): JsonResponse
    {
        return (new ProjectResource($project))
            ->withBlocks()
            ->response();
    }
}
