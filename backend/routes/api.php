<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::controller(EventController::class)->group(function(){
    Route::get('/events', 'index');
    Route::get('/events/{event:slug}', 'show');
});

Route::controller(ProjectController::class)->group(function(){
    Route::get('/projects', 'index');
    Route::get('/projects/{project:slug}', 'show');
});

Route::controller(BlockController::class)->group(function(){
    Route::get('/{modelName}/{slug}/blocks', 'getBlocks');
});
