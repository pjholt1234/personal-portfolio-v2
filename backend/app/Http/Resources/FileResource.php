<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'machine_name' => $this->machine_name,
            'url' => $this->media?->first() ? asset('storage/' . $this->media->first()->id . '/' . $this->media->first()->file_name) : null,
        ];
    }
}
