<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public $timestamps = false;

    public function domains(): HasMany
    {
        return $this->hasMany(Domain::class);
    }
}
