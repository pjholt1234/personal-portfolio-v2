<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Api\CVController;
use Illuminate\Support\Facades\Route;

// Health check endpoint - unprotected
Route::get('/health', [HealthController::class, 'check']);

// Protected API routes
Route::group(['middleware' => ['api']], function () {
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

    Route::controller(CVController::class)->group(function(){
        Route::get('/cv', 'getCV');
        Route::post('/cv/generate', 'generate');
    });
});
