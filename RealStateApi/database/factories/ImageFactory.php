<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Marker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $image= 'imgMarker'. rand(1,6) . '.png';
        return [
            
            'marker_id' => Marker::inRandomOrder()->first()->id,
            'src_img'=> $image ,
        ];
    }
}
