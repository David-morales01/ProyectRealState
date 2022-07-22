<?php

namespace App\Http\Controllers\Api\Marker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marker;
use App\Models\Image; 
use Illuminate\Support\Facades\Auth; 
use App\Http\Resources\MarkerResource; 
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
        // $this->authorize('adMarker');
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

    public function filter(Request $request)
    {
         $room = $request->input('room');
         $toilet = $request->input('toilet');
         $title = $request->input('title');
         $business_types_id = $request->input('business_types_id');
         $price = $request->input('price');
        // filterValues:{'title':null,'business_business_types_ids_id': null,'price':null,'room':null,'toilet':null},
 

        $marker = Marker::query()
            ->when($business_types_id,
                function ($query) use ($business_types_id) {
                    $query->where('business_types_id', $business_types_id);
                })
            ->when($room,
                function ($query) use ($room) {
                    ($room == 5) ? $query->where('room', '>=', $room) : 
                    $query->where('room', '<=', $room);
                })
            ->when($toilet,
                function ($query) use ($toilet) {
                    ($toilet == 5) ? $query->where('toilet', '>=', $toilet)
                        : $query->where('toilet', '<=', $toilet);
                })
            ->when($request->input('price'),
                function ( $query) use ($price) {
                    $query->whereBetween('price', explode(',', $price) );
                })
            ->when($title ,
                function ( $query) use ($title) {
                    $query->where('name', 'like', "%$title");
                })->with('images')->get();
            return MarkerResource::make($marker);  
    }
   
}
