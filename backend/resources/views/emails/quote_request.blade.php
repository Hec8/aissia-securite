<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Nouvelle demande de devis</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2937;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding:24px 12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(31,41,55,0.08);">
                    <tr>
                        <td style="background:linear-gradient(90deg,#0f172a,#0ea5a7);padding:24px;color:#fff;">
                            <h1 style="margin:0;font-size:20px;letter-spacing:0.2px">Nouvelle demande de devis</h1>
                            <p style="margin:6px 0 0;font-size:13px;opacity:0.9">Une nouvelle demande a été reçue via le formulaire de contact.</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:20px 28px 8px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="vertical-align:top;padding-bottom:12px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Société</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->company_name ?? '—' }}</div>
                                    </td>
                                    <td style="vertical-align:top;padding-bottom:12px;padding-left:24px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Contact</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->contact_name ?? '—' }}</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="vertical-align:top;padding-bottom:12px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Email</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->email }}</div>
                                    </td>
                                    <td style="vertical-align:top;padding-bottom:12px;padding-left:24px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Téléphone</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->phone ?? '—' }}</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="vertical-align:top;padding-bottom:12px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Service demandé</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->service_type }}</div>
                                    </td>
                                    <td style="vertical-align:top;padding-bottom:12px;padding-left:24px;">
                                        <strong style="display:block;font-size:13px;color:#374151;margin-bottom:6px;">Référence</strong>
                                        <div style="font-size:15px;color:#111827">{{ $quote->reference }}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 28px 20px 28px;">
                            <strong style="display:block;font-size:13px;color:#374151;margin-bottom:8px;">Description</strong>
                            <div style="background:#f8fafc;border:1px solid #e6eef2;padding:12px;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.45;white-space:pre-wrap;">{{ $quote->description }}</div>
                        </td>
                    </tr>

                    @if($quote->ncc || $quote->rccm)
                    <tr>
                        <td style="padding:0 28px 18px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:6px;">
                                @if($quote->ncc)
                                <tr>
                                    <td style="padding:8px 0;border-top:1px solid #eef2f7;">
                                        <strong style="font-size:13px;color:#374151;display:block">Numéro de Compte Contribuable (NCC)</strong>
                                        <div style="font-size:14px;color:#111827">{{ $quote->ncc }}</div>
                                    </td>
                                </tr>
                                @endif
                                @if($quote->rccm)
                                <tr>
                                    <td style="padding:8px 0;border-top:1px solid #eef2f7;">
                                        <strong style="font-size:13px;color:#374151;display:block">Régistre de Commerce (RCCM)</strong>
                                        <div style="font-size:14px;color:#111827">{{ $quote->rccm }}</div>
                                    </td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                    @endif

                    <tr>
                        <td style="padding:18px 28px 24px 28px;border-top:1px solid #eef2f7;background:#ffffff;">
                            <p style="margin:0;font-size:13px;color:#6b7280">Envoyé le {{ $quote->created_at->format('d/m/Y H:i') }}</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#0f172a;color:#fff;padding:12px 20px;text-align:center;font-size:13px;">
                            <div>AISSIA Sécurité — <span style="opacity:0.85">Service commercial</span></div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>