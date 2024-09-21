<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Domain;
use App\Models\Visit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VisitController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            $domain = Domain::where('domain', $request->input('domain'))->first();

            $visit = Visit::create([
                'domain_id' => $domain->id,
                'created_at' => now(),
                ...$request->only('page', 'ip', 'user_agent', 'browser', 'device', 'platform'),
            ]);

            $contactInfo = json_encode([
                'contact_name' => $request->input('contact_name'),
                'contact_data' => $request->input('contact_data'),
            ]);

            $contact = Contact::create([
                'visit_id' => $visit->id,
                'created_at' => now(),
                'info' => $contactInfo,
            ]);
        } catch (\Exception $exception) {
            Log::debug('Ошибка сохранения посещения и контакта: ' . $exception->getMessage());
            throw $exception;
        }

        return response()->json([
            'data' => $visit,
        ]);
    }
}
