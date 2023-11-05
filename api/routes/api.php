<?php

use App\Http\Controllers\WebInit;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::get('/test', function () {
    return 'test';
});
Route::get('/auth',[AuthController::class,'current_user'])->name('login');
Route::post('/auth/signin', [AuthController::class, 'signin']);
Route::post('/auth/signup', [AuthController::class, 'signup']);
#get user profile
Route::get('/users/{id}', [UserController::class,'show'])->name('users.show');
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::controller(ProductController::class)
    ->prefix('/products')
    ->name('products.')
    ->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/collection/{search}', 'showCollection')->name('showCollection');
        Route::get('/brand/{search}', 'showBrand')->name('showBrand');
    });

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(ProductController::class)
    ->prefix('/products')
    ->name('products.')
    ->group(function(){
        Route::post('/', 'store')->name('store');
        Route::post('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });
});
