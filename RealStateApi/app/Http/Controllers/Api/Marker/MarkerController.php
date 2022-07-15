<?php

namespace App\Http\Controllers\Api\Marker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marker;
use App\Models\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use App\Http\Resources\MarkerResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

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
                'images' => ['required']
            ]
        );
        $data['user_id'] = $auth_id ;
        $data['status'] = false;
        $imageList = $request->file('images');
        unset($data['images']);
        $marker = Marker::create($data)->fresh();
         logger([
            'images' => $imageList
        ]); 

        /** @var UploadedFile $image */
        foreach($imageList ?? [] as $image){
            logger([
                'images' => $imageList
            ]); 
            $newImage['marker_id']= $marker->id; 
            // $image->store('images/markers','public'); 
            $tempImage= $image->store('images/markers','public');
          
            $newImage['src_img']=  $tempImage;  
            $temp = Image::create($newImage); 
        }
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
