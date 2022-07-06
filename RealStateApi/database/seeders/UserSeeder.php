<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name' => 'David Morales',
                'email' => 'davidmorales@gmail.com',
                'email_verified_at' => now(),
                'created_at' => now(),
                'img_user'=>   'default1.png',
                'remember_token' => Str::random(10),
                'password' => bcrypt('1234567891'),
                'rol' => (null)
            ],
        );
            
        DB::table('users')->insert(
            [
                'name' => 'Enrique Cajina',
                'email' => 'enriquecajina@gmail.com',
                'email_verified_at' => now(),
                'created_at' => now(),
                'img_user'=>   'default2.png',
                'remember_token' => Str::random(10),
                'password' => bcrypt('1234567891'),
                'rol' => ('admin')
            ],
        );
        
        DB::table('users')->insert(
            [
                'name' => 'Daniel Cajina',
                'email' => 'danielcajina@gmail.com',
                'email_verified_at' => now(),
                'created_at' => now(),
                'img_user'=>   'default3.png',
                'remember_token' => Str::random(10),
                'password' => bcrypt('1234567891'),
                'rol' => (null)
            ]
        );
    }
}
