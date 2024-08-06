<?php

use App\Models\User;
use CodelyTv\Criteria\Eloquent\CriteriaToEloquentConverter;
use CodelyTv\Criteria\FromLaravelRequest\CriteriaFromLaravelRequestConverter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('users', function (Request $request) {
    $criteria = CriteriaFromLaravelRequestConverter::convert($request);

    return CriteriaToEloquentConverter::convert(User::query(), $criteria)->get();
});
