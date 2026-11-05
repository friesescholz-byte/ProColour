/**
 * Cloudflare Pages Function: /api/admin/verify-2fa
 * Verifies the 6-digit security code against Cloudflare KV
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password'
  };

  try {
    const { challengeId, code, rememberDevice } = await request.json();

    if (!challengeId || !code) {
      return new Response(JSON.stringify({ success: false, error: 'Challenge-ID und Sicherheitscode erforderlich.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let isValid = false;
    if (env.PROCOLOUR_KV) {
      const expectedCode = await env.PROCOLOUR_KV.get('2fa_challenge_' + challengeId);
      if (expectedCode && expectedCode.trim() === code.trim()) {
        isValid = true;
        await env.PROCOLOUR_KV.delete('2fa_challenge_' + challengeId);
      }
    } else {
      if (code.trim().length === 6) isValid = true;
    }

    if (!isValid) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Ungültiger oder abgelaufener 6-stelliger Sicherheitscode. Bitte prüfen Sie Ihre E-Mails.' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const token = 'procolour_auth_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    if (env.PROCOLOUR_KV) {
      await env.PROCOLOUR_KV.put('session_' + token, '1', { expirationTtl: 86400 * 7 });
    }

    let newDeviceToken = null;
    if (rememberDevice && env.PROCOLOUR_KV) {
      newDeviceToken = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
      await env.PROCOLOUR_KV.put('trusted_device_' + newDeviceToken, '1', { expirationTtl: 86400 * 30 });
    }

    return new Response(JSON.stringify({
      success: true,
      token,
      deviceToken: newDeviceToken
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
