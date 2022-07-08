<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('business_types')->insert(['name' => 'Home','created_at' => now()]);
        DB::table('business_types')->insert(['name' => 'Commercial','created_at' => now()]);
        DB::table('business_types')->insert(['name' => 'Apartment','created_at' => now()]);
        DB::table('business_types')->insert(['name' => 'Vacant','created_at' => now()]);
    }
}

