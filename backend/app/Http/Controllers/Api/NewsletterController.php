<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewsletterSubscriptionMail;

class NewsletterController extends Controller
{
    /**
     * Liste tous les abonnés (admin)
     */
    public function index(): JsonResponse
    {
        $subscribers = NewsletterSubscriber::latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $subscribers,
            'stats' => [
                'total' => $subscribers->count(),
                'active' => $subscribers->where('is_active', true)->count(),
                'unsubscribed' => $subscribers->where('is_active', false)->count(),
            ]
        ]);
    }

    /**
     * Inscription à la newsletter (public)
     */
    public function subscribe(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        // Vérifier si l'email existe déjà
        $existing = NewsletterSubscriber::where('email', $data['email'])->first();

        if ($existing) {
            if ($existing->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cette adresse email est déjà inscrite à notre newsletter.'
                ], 422);
            }
            
            // Réactiver l'abonnement
            $existing->update([
                'is_active' => true,
                'name' => $data['name'] ?? $existing->name,
                'unsubscribed_at' => null,
                'subscribed_at' => now(),
            ]);

            // Notify admin of re-activation
            try {
                Mail::to('info@aissia-securite.com')->send(new NewsletterSubscriptionMail($existing));
            } catch (\Throwable $e) {
                logger()->error('Failed to send newsletter reactivation email: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Votre abonnement a été réactivé avec succès.',
                'data' => $existing
            ]);
        }

        $subscriber = NewsletterSubscriber::create([
            'email' => $data['email'],
            'name' => $data['name'] ?? null,
            'subscribed_at' => now(),
        ]);

        // Send notification to admin about new subscriber
        try {
            Mail::to('info@aissia-securite.com')->send(new NewsletterSubscriptionMail($subscriber));
        } catch (\Throwable $e) {
            logger()->error('Failed to send newsletter subscription email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Inscription à la newsletter réussie !',
            'data' => $subscriber
        ], 201);
    }

    /**
     * Désabonnement (public)
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $subscriber = NewsletterSubscriber::where('email', $data['email'])->first();

        if (!$subscriber) {
            return response()->json([
                'success' => false,
                'message' => 'Adresse email non trouvée.'
            ], 404);
        }

        $subscriber->update([
            'is_active' => false,
            'unsubscribed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Vous avez été désabonné de notre newsletter.'
        ]);
    }

    /**
     * Supprimer un abonné (admin)
     */
    public function destroy(NewsletterSubscriber $subscriber): JsonResponse
    {
        $subscriber->delete();

        return response()->json([
            'success' => true,
            'message' => 'Abonné supprimé.'
        ]);
    }
}
