<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
class UserController extends Controller
{
    public function update(Request $request)
    {
        $user= User::findOrFail($request->id);
        $data = $request->validate(
            [
                'nombre'=>['required'], 
                'email'=>['required'], 
                'img_user'=>['required'],  
            ]
        );
        if($request->password != null){
            $data['password'] =bcrypt($request->password );
        }else{
            
            $data['password'] =$user->password;
        }

        $user->update($data);

        
        return UserResource::make($user); 



    }
}
