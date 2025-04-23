<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::all();
        return EventResource::collection($events)->response();
    }

    public function show(Event $event): JsonResponse
    {
        return (new EventResource($event))
            ->withBlocks()
            ->response();
    }
}
