<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(EventController::class)->group(function(){
    Route::get('/events', 'index');
});

Route::controller(ProjectController::class)->group(function(){
    Route::get('/projects', 'index');
});
