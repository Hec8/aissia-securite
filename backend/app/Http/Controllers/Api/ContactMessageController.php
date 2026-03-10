<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageReceivedMail;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactMessageController extends Controller
{
    public function index(): JsonResponse
    {
        $messages = ContactMessage::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
            'stats' => [
                'total' => $messages->count(),
                'unread' => $messages->where('is_read', false)->count(),
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:10'],
            // Attachment required when submitting an application (is_application=1)
            'attachment' => ['required_if:is_application,1', 'file', 'mimes:zip', 'max:10240'], // max 10 MB
        ]);

        // Handle optional attachment
        if ($request->hasFile('attachment')) {
            try {
                $path = $request->file('attachment')->store('contact_uploads');
                $data['attachment_path'] = $path;
            } catch (\Throwable $e) {
                logger()->warning('Failed to store attachment: ' . $e->getMessage());
            }
        }

        $message = ContactMessage::create($data);

        // Send notification email to info@aissia-securite.com
        try {
            Mail::to('info@aissia-securite.com')->send(new ContactMessageReceivedMail($message));
        } catch (\Throwable $e) {
            logger()->error('Failed to send contact message email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
            'data' => $message
        ], 201);
    }

    public function show(ContactMessage $contactMessage): JsonResponse
    {
        // Marquer comme lu automatiquement
        $contactMessage->markAsRead();

        return response()->json([
            'success' => true,
            'data' => $contactMessage
        ]);
    }

    /**
     * List only contact messages that include an attachment (applications)
     */
    public function applications(): JsonResponse
    {
        $messages = ContactMessage::whereNotNull('attachment_path')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    /**
     * Download the attachment for a given contact message (admin only)
     */
    public function downloadAttachment(ContactMessage $contactMessage)
    {
        if (empty($contactMessage->attachment_path) || !Storage::disk('local')->exists($contactMessage->attachment_path)) {
            return response()->json(['success' => false, 'message' => 'Fichier introuvable'], 404);
        }

        $path = Storage::disk('local')->path($contactMessage->attachment_path);
        return response()->download($path, basename($path));
    }

    public function markAsRead(ContactMessage $contactMessage): JsonResponse
    {
        $contactMessage->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme lu.',
            'data' => $contactMessage
        ]);
    }

    public function destroy(ContactMessage $contactMessage): JsonResponse
    {
        $contactMessage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé.'
        ]);
    }
}
