<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    use HasBlocks;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data =  [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'slug' => $this->slug,
            'type' => $this->type,
            'icon' => $this->icon,
            'description' => $this->description,
            'description_long' => $this->description_long,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'files' => FileResource::collection($this->files),
        ];

        return $this->addBlocksWhenRequested($data);
    }
}
