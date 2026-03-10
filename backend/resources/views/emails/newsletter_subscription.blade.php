<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nouvel abonné newsletter</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2937;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(31,41,55,0.08);">
          <tr>
            <td style="background:linear-gradient(90deg,#0f172a,#0ea5a7);padding:20px;color:#fff;">
              <h1 style="margin:0;font-size:18px">Nouvel abonné à la newsletter</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px;">
              <div style="font-size:15px;color:#111827;margin-bottom:12px;">Une nouvelle personne s'est inscrite à la newsletter :</div>
              <div style="padding:12px;border-radius:8px;background:#f8fafc;border:1px solid #e6eef2;">
                <div style="font-size:15px;color:#111827"><strong>Email:</strong> {{ $subscriber->email }}</div>
                @if($subscriber->name)
                <div style="font-size:15px;color:#111827;margin-top:6px"><strong>Nom:</strong> {{ $subscriber->name }}</div>
                @endif
                <div style="font-size:13px;color:#6b7280;margin-top:10px">Inscrit le {{ $subscriber->subscribed_at->format('d/m/Y H:i') }}</div>
              </div>
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
