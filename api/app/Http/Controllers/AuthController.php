<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Testing\Fluent\Concerns\Has;

class AuthController extends Controller
{   
    public function index(){
        return "hi";
    }
    public function signin(Request $request)
    {
        $pass = User::where('email', $request->email)->get('password');
        // dd($request->password);
        if ($pass) {
            // dd($pass[0]->password, $request->password);
            // $hash=Hash::make($request->password);
            // dd($request->password,$hash,Hash::check($request->password, $hash));
            if (Hash::check($request->password, $pass[0]->password)) {
                $user = User::where('email', $request->email)->first();
                // dd($user);
                $token = $user->createToken('myapptoken')->plainTextToken;
                $response = [
                    'user' => $user,
                    'token' => $token
                ];
                return response($response, 200);
            }      
        }

        return response(null,401);
    }

    public function signup(Request $request)
    {
        // dd($request)
        // $request->password = Hash::make($request['password']);
        $user = User::where('email', $request->email)->first();
        if($user) return response("Email existed", 400);
        $data=$request->all();
        $data['password']=Hash::make($request->password);

        $user = User::create($data);
        if($user)return response("Registered", 201);
        return response("Not registered", 401);
    }

    public function forgot_password_handle(UpdateUserRequest $request): RedirectResponse
    {
        $request = $request->validated();
        $status = Password::sendResetLink(
            $request,
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with([
                'status' => __($status)
            ])
            : back()->withErrors([
                'email' => __($status)
            ]);
    }


    public function update_password(Request $request): RedirectResponse
    {

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:1|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $password = Hash::make($password);
                $user->forceFill([
                    'password' => $password
                ]);

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
    public function signout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response('Logged out',200);
    }
    public function current_user(Request $request)
    {
        return auth()->user();
    }
}
