<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index(Project $project): JsonResponse
    {
        $posts = $project->posts()
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        return PostResource::collection($posts)->response();
    }

    public function show(Project $project, string $postSlug): JsonResponse
    {
        $post = $project->posts()
            ->where('slug', $postSlug)
            ->firstOrFail();

        // Get previous and next posts
        $previousPost = $project->posts()
            ->whereNotNull('published_at')
            ->where('published_at', '<', $post->published_at ?? now())
            ->orderBy('published_at', 'desc')
            ->first();

        $nextPost = $project->posts()
            ->whereNotNull('published_at')
            ->where('published_at', '>', $post->published_at ?? now())
            ->orderBy('published_at', 'asc')
            ->first();

        return (new PostResource($post))
            ->additional([
                'previous_post' => $previousPost ? [
                    'title' => $previousPost->title,
                    'slug' => $previousPost->slug,
                ] : null,
                'next_post' => $nextPost ? [
                    'title' => $nextPost->title,
                    'slug' => $nextPost->slug,
                ] : null,
            ])
            ->withBlocks()
            ->response();
    }
}
