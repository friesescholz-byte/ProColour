/**
 * Pro Colour Smart Repair – Cloudflare Worker
 * Server-side Admin Authentication & Asset Delivery with Security Headers
 * Following the Weymann-Architecture Standard
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password'
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ───── WEYMANN-ARCHITEKTUR: ADMIN LOGIN MIT CLOUDFLARE TURNSTILE ─────
    if ((url.pathname === '/api/login' || url.pathname === '/api/admin/login') && method === 'POST') {
      try {
        const body = await request.json();
        const { password, turnstileToken } = body;
        const turnstileSecret = env.TURNSTILE_SECRET_KEY || '0x4AAAAAAFRMeGFK1lbUX8dYa_jsx-aA6Ak';
        const expectedPassword = env.Passwort || env.ADMIN_PASSWORD;

        // 1. Cloudflare Turnstile Bot- & Brute-Force-Schutz prüfen
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

        // 2. Passwort prüfen (Serverseitiges Secret oder Fallback-Hash)
        let isMatch = false;
        if (expectedPassword && password === expectedPassword) {
          isMatch = true;
        } else {
          // Kryptografischer SHA-256 Abgleich für Robustheit
          const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password || ''));
          const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
          if (hashHex === '9e036ab964d8b296f762374e6160b8e5b6706630cb4b784397c418801fb648be') {
            isMatch = true;
          }
        }

        if (isMatch) {
          return new Response(JSON.stringify({ success: true, message: 'Authentifizierung erfolgreich.' }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ success: false, error: 'Ungültiges Passwort.' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ───── ASSET DELIVERY & SECURITY HEADERS ─────
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      const secHeaders = new Headers(assetResponse.headers);
      secHeaders.set('X-Frame-Options', 'DENY');
      secHeaders.set('X-Content-Type-Options', 'nosniff');
      secHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers: secHeaders
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
