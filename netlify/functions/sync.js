import { getStore } from "@netlify/blobs";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    }
  });
}

export default async (req, _context) => {
  if (req.method === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  try {
    const dataStore = getStore({ name: "devexam_userdata" });
    const url = new URL(req.url);

    if (req.method === "GET") {
      const userId = url.searchParams.get("userId");
      if (!userId) {
        return jsonResponse({ success: false, message: "userId mancante." }, 400);
      }

      const userData = await dataStore.get(`user_${userId}`, { type: "json" }).catch(() => null);
      return jsonResponse({ success: true, data: userData || null });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const { userId, data } = body;

      if (!userId || !data) {
        return jsonResponse({ success: false, message: "userId e data sono obbligatori." }, 400);
      }

      await dataStore.setJSON(`user_${userId}`, {
        ...data,
        lastSyncedAt: new Date().toISOString()
      });

      return jsonResponse({ success: true, message: "Dati sincronizzati su Netlify Blobs con successo." });
    }

    return jsonResponse({ success: false, message: "Metodo non consentito." }, 405);
  } catch (error) {
    return jsonResponse({ success: false, message: error.message || "Errore di sincronizzazione Netlify Blobs." }, 500);
  }
};
