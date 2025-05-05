<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    use HasBlocks;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'title' => $this->title,
            'slug' => $this->slug,
            'subtitle' => $this->subtitle,
            'type' => $this->type,
            'icon' => $this->icon,
            'description' => $this->description,
            'description_long' => $this->description_long,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'technologies' => $this->technologies->pluck('name')->toArray(),
            'github_link' => $this->github_link,
            'hidden' => $this->hidden,
            //'media' => $this->getMedia($this->media),
        ];

        return $this->addBlocksWhenRequested($data);
    }

    private function getMedia(array $media){
        return $media?->map(function ($media) {
            return [
                'display_name' => $media->display_name,
                'icon' => $media->icon,
                'media_url' => asset('storage/' . $media->file),
            ];
        })->toArray();
    }
}
