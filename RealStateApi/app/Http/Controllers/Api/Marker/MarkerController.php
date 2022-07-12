<?php

namespace App\Http\Controllers\Api\Marker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marker;
use App\Models\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use App\Http\Resources\MarkerResource;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $marker = Marker::with('images')->get();
        return $marker;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $auth_id = Auth::id();
        $data = $request->validate(
            [
                'title'=>['required'], 
                'description'=>['required'], 
                'room'=>['required'], 
                'toilet'=>['required'], 
                'price'=>['required'], 
                'long'=>['required'], 
                'lat'=>['required'], 
                'business_types_id'=>['required'], 
            ]
        );
        $data['user_id'] = $auth_id ;
        $data['status'] = false;
        $marker = Marker::create($data)->fresh();
        $marker->load('images');
        
        return MarkerResource::make($marker);

         
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
