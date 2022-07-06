<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    
    protected $guarded=[];
    use HasFactory;

    protected $casts = [
        'status' => 'boolean',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }
}
