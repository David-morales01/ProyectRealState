<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
Use App\Models\User;

class MarkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //'owner_id' => User::inRandomOrder()->first()->id,
        DB::table('markers')->insert(
            [    
                'user_id' => 1,  
                'title' => 'Nerdify departments',
                'description' => 'Departments for engineers',
                'room' => rand(1,10),
                'toilet' => rand(1,10),
                'price' => rand(500,6000),
                'coordinate' => '-86.25717043876647,12.126737986671706',
                'status' => false,
                'created_at' => now(),
            ]
        );
            
        DB::table('markers')->insert(
            [
                'user_id' => User::inRandomOrder()->first()->id,
                'title' => 'Chipote  House',
                'description' => 'House for those recently out of chipote',
                'room' => rand(1,10),
                'toilet' => rand(1,10),
                'price' => rand(500,6000),
                'coordinate' => '-86.27419710159302,12.140819668287174',
                'status' => false,
                'created_at' => now(), 
            ]
        );
        
        DB::table('markers')->insert(
            [
                'user_id' => User::inRandomOrder()->first()->id,
                'title' => 'Monseñor departments',
                'description' => 'houses for the people of my good government',
                'room' => rand(1,10),
                'toilet' => rand(1,10),
                'price' => rand(500,6000),
                'coordinate' => '-86.29731237888336,12.147049984859208',
                'status' => false,
                'created_at' => now(), 
            ]
        );
        
        DB::table('markers')->insert(
            [
                'user_id' => User::inRandomOrder()->first()->id,
                'title' => 'Metrocentro shopping center',
                'description' => 'Most popular shopping center in managuat',
                'room' => rand(1,10),
                'toilet' => rand(1,10),
                'price' => rand(500,6000),
                'coordinate' => '-86.26501590013504,12.128072762712032',
                'status' => false,
                'created_at' => now(), 
            ]
        );
    }
}
