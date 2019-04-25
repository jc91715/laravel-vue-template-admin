<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user = $request->user();
    return ['name'=>$user->name,'introduction'=>'','avatar'=>'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif','roles'=>['admin']];
});
