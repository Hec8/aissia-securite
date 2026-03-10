<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nouveau message de contact</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2937;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(31,41,55,0.08);">
          <tr>
            <td style="background:linear-gradient(90deg,#0f172a,#0ea5a7);padding:20px;color:#fff;">
              <h1 style="margin:0;font-size:18px">Nouveau message de contact</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px;">
              <strong style="display:block;font-size:13px;color:#374151;margin-bottom:8px;">De</strong>
              <div style="font-size:15px;color:#111827;margin-bottom:12px;">{{ $contact->name }} — {{ $contact->email }} @if($contact->phone) • {{ $contact->phone }} @endif</div>

              @if($contact->company)
              <div style="margin-bottom:12px;"><strong style="color:#374151">Société:</strong> <span style="color:#111827">{{ $contact->company }}</span></div>
              @endif

              @if($contact->subject)
              <div style="margin-bottom:12px;"><strong style="color:#374151">Sujet:</strong> <span style="color:#111827">{{ $contact->subject }}</span></div>
              @endif

              <div style="margin:16px 0;">
                <strong style="display:block;font-size:13px;color:#374151;margin-bottom:8px;">Message</strong>
                <div style="background:#f8fafc;border:1px solid #e6eef2;padding:12px;border-radius:8px;color:#0f172a;font-size:14px;white-space:pre-wrap;">{{ $contact->message }}</div>
              </div>

              @if(!empty($contact->attachment_path))
              <div style="margin:12px 0;">
                <strong style="display:block;font-size:13px;color:#374151;margin-bottom:8px;">Pièce jointe</strong>
                <div style="background:#fff7ed;border:1px solid #fde3bf;padding:12px;border-radius:8px;color:#92400e;font-size:14px;">
                  Un fichier ZIP a été téléversé : <strong>{{ basename($contact->attachment_path) }}</strong>. Il est également envoyé en pièce jointe de ce mail.
                </div>
              </div>
              @endif

              <p style="margin:12px 0 0;font-size:13px;color:#6b7280">Envoyé le {{ $contact->created_at->format('d/m/Y H:i') }}</p>
            </td>
          </tr>

          <tr>
            <td style="background:#0f172a;color:#fff;padding:12px 20px;text-align:center;font-size:13px;">
              <div>AISSIA Sécurité — Service commercial</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
