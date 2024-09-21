<?php

use App\Http\Controllers\DomainController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('main');
});

Route::get('/test', function () {
    return view('test_page');
});

Route::get('/domains', [DomainController::class, 'index']);
Route::post('/visits', [VisitController::class, 'store']);


