<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class QuoteController extends Controller
{
    /**
     * Liste tous les devis (admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Quote::query();

        // Filtrage par statut
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $quotes = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $quotes,
            'stats' => [
                'total' => Quote::count(),
                'pending' => Quote::where('status', 'pending')->count(),
                'in_progress' => Quote::whereIn('status', ['contacted', 'in_progress', 'quoted'])->count(),
                'accepted' => Quote::where('status', 'accepted')->count(),
                'rejected' => Quote::where('status', 'rejected')->count(),
            ]
        ]);
    }

    /**
     * Créer une demande de devis (public)
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'service_type' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:20'],
            'budget_min' => ['nullable', 'numeric', 'min:0'],
            'budget_max' => ['nullable', 'numeric', 'min:0'],
            'desired_start_date' => ['nullable', 'date', 'after_or_equal:today'],
            'ncc' => ['nullable', 'string', 'max:255'],
            'rccm' => ['nullable', 'string', 'max:255'],
        ]);

        $quote = Quote::create($data);

        // Send email to info@aissia-securite.com
        Mail::to('info@aissia-securite.com')->send(new \App\Mail\QuoteRequestMail($quote));

        return response()->json([
            'success' => true,
            'message' => 'Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.',
            'data' => [
                'reference' => $quote->reference,
            ]
        ], 201);
    }

    /**
     * Voir un devis (admin)
     */
    public function show(Quote $quote): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $quote
        ]);
    }

    /**
     * Mettre à jour le statut d'un devis (admin)
     */
    public function update(Request $request, Quote $quote): JsonResponse
    {
        $data = $request->validate([
            'status' => ['sometimes', 'in:pending,contacted,in_progress,quoted,accepted,rejected'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $quote->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Devis mis à jour.',
            'data' => $quote
        ]);
    }

    /**
     * Supprimer un devis (admin)
     */
    public function destroy(Quote $quote): JsonResponse
    {
        $quote->delete();

        return response()->json([
            'success' => true,
            'message' => 'Devis supprimé.'
        ]);
    }
}
