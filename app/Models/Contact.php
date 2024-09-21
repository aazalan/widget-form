<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $fillable = [
        'visit_id',
        'info',
        'created_at',
    ];

    public $timestamps = false;

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class);
    }
}
