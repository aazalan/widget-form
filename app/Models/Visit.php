<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Visit extends Model
{
    protected $fillable = [
        'domain_id',
        'page',
        'ip',
        'user_agent',
        'browser',
        'device',
        'platform',
        'created_at',
    ];

    public $timestamps = false;

    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }
}
