/**
 * Cloudflare Pages Function: /api/admin/login
 * Weymann-Architektur Admin Login mit Cloudflare Turnstile & 2FA Sicherheitscode
 */

const INITIAL_PROJECTS = [
  {
    id: 'leder-rueckseite-fahrersitz',
    category: 'leder',
    title: 'Rückseite Fahrersitz: Fleck- & Farbinstandsetzung',
    desc: 'Tiefe Flecken, Druckstellen und Verfärbungen am hellen Leder fachgerecht entfernt, exakt beilackiert und werksgetreu versiegelt.',
    before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Vorher-Nachher/leder_fahrersitz_vorher.webp',
    after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Vorher-Nachher/leder_fahrersitz_nachher.webp',
    createdAt: '2026-09-04T10:00:00.000Z'
  },
  {
    id: 'aussenspiegel-lackierung',
    category: 'lack',
    title: 'Außenspiegel & Kleinteile-Lackierung',
    desc: 'Tiefe Schrammen und Kratzer an der Spiegelkappe punktgenau beilackiert – 100% Farbangleich ohne Neukauf.',
    before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(22)_ergebnis.webp',
    after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(23)_ergebnis.webp',
    createdAt: '2026-09-02T10:00:00.000Z'
  },
  {
    id: 'stossstangenschaden',
    category: 'stossstange',
    title: 'Stoßstangenschaden ohne Teiletausch',
    desc: 'Schrammen am Stoßfänger direkt am Fahrzeug behoben – Originallack erhalten, meist am selben Tag fertig.',
    before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(12)_ergebnis.webp',
    after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(13)_ergebnis.webp',
    createdAt: '2026-09-03T10:00:00.000Z'
  },
  {
    id: 'leder-aufbereitung',
    category: 'leder',
    title: 'Leder-Aufbereitung & Nachfärbung',
    desc: 'Rissiges und abgenutztes Leder fachgerecht instandgesetzt, tiefengereinigt, nachgefärbt und neu versiegelt.',
    before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(25)_ergebnis.webp',
    after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(24)_ergebnis.webp',
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: 'dellen-ausbeulen-ohne-lackieren',
    category: 'dellen',
    title: 'Dellenentfernung ohne Lackieren (DoL)',
    desc: 'Parkdelle und Blechschaden schonend herausmassiert – 100% Werkslack erhalten, ganz ohne Spachtel- oder Lackierarbeiten.',
    before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Color-Dellen_01.webp',
    after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Color-Dellen_02.webp',
    createdAt: '2026-09-05T10:00:00.000Z'
  }
];

async function send2FACodeEmail(code, env) {
  const resendApiKey = env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured in env secrets');
    return false;
  }
  const recipientEmail = env.ADMIN_EMAIL || 'info@pro-colour.de';

  const emailSubject = `[ProColour] Sicherheitscode: ${code}`;
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="de">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#0b0d13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#0b0d13;padding:40px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:540px;background-color:#12151C;border:1px solid rgba(255,255,255,0.08);border-top:4px solid #FF5E1E;border-radius:12px;overflow:hidden;box-shadow:0 15px 35px rgba(0,0,0,0.6);">
              <tr>
                <td style="padding:28px 32px;background-color:#161922;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <h2 style="margin:0;color:#ffffff;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;">Pro Colour Smart Repair</h2>
                  <p style="margin:4px 0 0 0;font-size:13px;color:#FF5E1E;font-weight:600;">Zwei-Faktor-Authentifizierung (2FA)</p>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#e2e8f0;">
                    Es wurde eine Anmeldung im <strong>Admin-Dashboard</strong> angefordert. Verwenden Sie den folgenden 6-stelligen Sicherheitscode zur Bestätigung:
                  </p>
                  <div style="background-color:rgba(255,255,255,0.04);border:2px dashed #FF5E1E;border-radius:10px;padding:20px;text-align:center;margin:24px 0;">
                    <span style="font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:900;letter-spacing:8px;color:#FF5E1E;display:inline-block;">
                      ${code}
                    </span>
                  </div>
                  <p style="margin:0 0 10px 0;font-size:13px;color:#94a3b8;line-height:1.5;">
                    ⏱️ <strong>Gültigkeit:</strong> Dieser Code ist für die nächsten <strong>10 Minuten</strong> gültig.
                  </p>
                  <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">
                    Falls Sie diese Anmeldung nicht selbst veranlasst haben, ignorieren Sie diese Nachricht. Ohne diesen Code ist kein Zugriff auf das Dashboard möglich.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#0d0f14;padding:18px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#64748b;">
                  Pro Colour Smart Repair · Im Rehbruch 1 · 31582 Nienburg<br>
                  Technischer Partner: <strong>Scholz & Friese Webdesign</strong>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const payload = {
    from: 'Scholz & Friese Webdesign <noreply@scholz-friese-webdesign.de>',
    to: recipientEmail,
    subject: emailSubject,
    html: emailHtml,
    headers: {
      'Auto-Submitted': 'auto-generated',
      'X-Entity-Ref-ID': `2fa-${Date.now()}`
    }
  };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error('2FA email send error:', err);
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password'
  };

  try {
    const body = await request.json();
    const { password, turnstileToken, deviceToken } = body;
    const turnstileSecret = env.TURNSTILE_SECRET_KEY || '0x4AAAAAAFRMeGFK1lbUX8dYa_jsx-aA6Ak';
    const expectedPassword = env.Passwort || env.ADMIN_PASSWORD;

    // 1. Cloudflare Turnstile Bot-Schutz validieren
    if (turnstileSecret) {
      if (!turnstileToken) {
        return new Response(JSON.stringify({ success: false, error: 'Bitte bestätigen Sie den Spam-Schutz (Turnstile).' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const verifyFormData = new FormData();
      verifyFormData.append('secret', turnstileSecret);
      verifyFormData.append('response', turnstileToken);
      const ip = request.headers.get('CF-Connecting-IP');
      if (ip) verifyFormData.append('remoteip', ip);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: verifyFormData
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return new Response(JSON.stringify({ success: false, error: 'Sicherheitsprüfung (Turnstile) fehlgeschlagen. Bitte erneut versuchen.' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 2. Passwort prüfen (gegen Secret oder SHA-256 Fallback)
    let isMatch = false;
    if (expectedPassword && password === expectedPassword) {
      isMatch = true;
    } else {
      const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password || ''));
      const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hashHex === '9e036ab964d8b296f762374e6160b8e5b6706630cb4b784397c418801fb648be') {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return new Response(JSON.stringify({ success: false, error: 'Ungültiges Passwort. Bitte überprüfen.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. Vertrauenswürdiges Gerät prüfen
    if (deviceToken && env.PROCOLOUR_KV) {
      try {
        const isTrusted = await env.PROCOLOUR_KV.get('trusted_device_' + deviceToken);
        if (isTrusted) {
          const token = 'procolour_auth_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
          await env.PROCOLOUR_KV.put('session_' + token, '1', { expirationTtl: 86400 * 7 });
          return new Response(JSON.stringify({ success: true, trusted: true, token }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (e) {}
    }

    // 4. 2FA Code generieren und per E-Mail an info@pro-colour.de senden
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const challengeId = 'ch_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);

    if (env.PROCOLOUR_KV) {
      await env.PROCOLOUR_KV.put('2fa_challenge_' + challengeId, code, { expirationTtl: 600 });
    }

    const mailSent = await send2FACodeEmail(code, env);
    const recipientEmail = env.ADMIN_EMAIL || 'info@pro-colour.de';

    return new Response(JSON.stringify({
      success: true,
      require2FA: true,
      challengeId,
      email: recipientEmail,
      mailSent
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password',
    },
  });
}
