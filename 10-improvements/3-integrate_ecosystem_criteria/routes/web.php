<?php

use App\Models\User;
use CodelyTv\Criteria\FromLaravelRequest\CriteriaFromLaravelRequestConverter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('users', function (Request $request) {
    $converter = new CriteriaFromLaravelRequestConverter();

    return $converter->toCriteria($request)->serialize();
});
