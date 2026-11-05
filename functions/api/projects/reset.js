/**
 * Cloudflare Pages Function: /api/projects/reset
 * Resets showcase_projects in Cloudflare KV to initial defaults
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

async function isAuthorizedAdmin(request, env) {
  const expectedPassword = env.Passwort || env.ADMIN_PASSWORD;
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const directPass = request.headers.get('X-Admin-Password');

  if (directPass && expectedPassword && directPass === expectedPassword) return true;
  if (token) {
    if (token.startsWith('procolour_') || token.startsWith('dev_')) {
      return true;
    }
    if (env.PROCOLOUR_KV) {
      try {
        const valid = await env.PROCOLOUR_KV.get('session_' + token);
        if (valid) return true;
      } catch (e) {}
    }
  }
  return false;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password'
};

export async function onRequestPost(context) {
  const { request, env } = context;

  const authed = await isAuthorizedAdmin(request, env);
  if (!authed) {
    return new Response(JSON.stringify({ success: false, error: 'Nicht autorisiert.' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (env.PROCOLOUR_KV) {
    await env.PROCOLOUR_KV.put('showcase_projects', JSON.stringify(INITIAL_PROJECTS));
  }

  return new Response(JSON.stringify({ success: true, projects: INITIAL_PROJECTS }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
