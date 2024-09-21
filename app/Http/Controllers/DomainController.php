<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class DomainController extends Controller
{
    protected array $blacklistedDomains = [

    ];

    public function index(Request $request) {
        $request->validate([
            'domains_created_days_ago' => 'nullable|integer',
            'users_created_days_ago' => 'nullable|integer',
            'only_visited' => 'nullable|boolean',
            'only_not_blacklisted' => 'nullable|boolean',
        ]);

        try {
            $query = Domain::query();

            if ($request->has('domains_created_days_ago')) {
                $query->whereDate('created_at', '>=', Carbon::now()->subDays($request->input('domains_created_days_ago')));
            }

            if ($request->has('users_created_days_ago')) {
                $query->whereHas('user', function($query) use ($request) {
                    $query->where('created_at', '>=', Carbon::now()->subDays($request->input('users_created_days_ago')));
                });
            }

            if ($request->has('only_visited')) {
                $query->has('visits', '>=', 1);
            }

            if ($request->has('only_not_blacklisted')) {
                $query->whereNotIn('domain', $this->blacklistedDomains);
            }

            $domains = $query->get();
        } catch (\Exception $exception) {
            Log::debug('Ошибка запроса списка доменов: ' . $exception->getMessage());
            throw $exception;
        }

        return response()->json([
            'data' => $domains,
        ]);
    }
}
