<?php

use App\Http\Requests\SearchUserRequest;
use App\Models\User;
use ComplexHeart\Domain\Criteria\Criteria;
use ComplexHeart\Infrastructure\Laravel\Persistence\EloquentCriteriaParser;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('users', function (SearchUserRequest $request) {
    $criteria = Criteria::fromSource($request);

    $builder = User::query();

    $parser = new EloquentCriteriaParser();

     return $parser
        ->applyCriteria($builder, $criteria)
        ->get();
});
