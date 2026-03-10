<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ContactMessageReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contact;

    public function __construct(ContactMessage $message)
    {
        $this->contact = $message;
    }

    public function build()
    {
        $mail = $this->subject('Nouveau message de contact')
                    ->view('emails.contact_message')
                    ->with(['contact' => $this->contact]);

        // If an attachment (zip) was uploaded, attach it to the email using the Storage disk
        if (!empty($this->contact->attachment_path) && Storage::disk('local')->exists($this->contact->attachment_path)) {
            // attachFromStorageDisk will read from storage and attach with correct name
            $mail->attachFromStorageDisk('local', $this->contact->attachment_path, basename($this->contact->attachment_path));
        }

        return $mail;
    }
}
