<?php

use App\Http\Controllers\DomainController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

Route::get('/domain-visits-app/{any}', function () {
    return view('main');
})->where('any', '.*');

Route::get('/test', function () {
    return view('test_page');
});

Route::get('/api/domains', [DomainController::class, 'index']);
Route::post('/api/visits', [VisitController::class, 'store']);



