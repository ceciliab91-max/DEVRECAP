import { getStore } from "@netlify/blobs";

const SALT = "devexam_security_salt_2026";

async function hashPassword(plainText) {
  if (!plainText) return "";
  const encoder = new TextEncoder();
  const data = encoder.encode(`${SALT}:${plainText}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const DEFAULT_USERS = [
  {
    id: "user-student-demo",
    username: "studente",
    email: "studente@devexam.it",
    passwordHash: "b23711a454a1a527e16632020f8c635491fb9f9bf39224881df223f01e2ff0a0",
    name: "Cecilia",
    role: "student",
    avatar: "👩‍💻",
    bio: "Sviluppatrice Web Junior in preparazione per l'esame finale.",
    targetGrade: "28/30",
    examDate: "2026-09-30",
    apiKey: "",
    createdAt: new Date().toISOString()
  },
  {
    id: "user-admin-demo",
    username: "admin",
    email: "admin@devexam.it",
    passwordHash: "1daafa46864f5a434c489d0c7ec46f747529457350a96819cbe11fd0b5bc705b",
    name: "Prof. Loris",
    role: "admin",
    avatar: "👨‍🏫",
    bio: "Docente ed Esaminatore per lo Sviluppo Web (CSS, JS, React, SQL).",
    targetGrade: "30L",
    examDate: "2026-10-15",
    apiKey: "",
    createdAt: new Date().toISOString()
  }
];

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
    const userStore = getStore({ name: "devexam_users" });
    
    // Ensure initial store list
    let users = [];
    try {
      const stored = await userStore.get("all_users", { type: "json" });
      if (Array.isArray(stored) && stored.length > 0) {
        users = stored;
      } else {
        const studentHash = await hashPassword("password");
        const adminHash = await hashPassword("admin");
        users = [
          { ...DEFAULT_USERS[0], passwordHash: studentHash },
          { ...DEFAULT_USERS[1], passwordHash: adminHash }
        ];
        await userStore.setJSON("all_users", users);
      }
    } catch {
      users = [...DEFAULT_USERS];
    }

    if (req.method === "GET") {
      // Return safe public user profiles without password hashes
      const publicUsers = users.map(({ password: _pwd, passwordHash: _hash, ...rest }) => rest);
      return jsonResponse({ success: true, users: publicUsers });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const { action, username, email, password, name, role = "student", apiKey = "", userId, updatedFields } = body;

      // 1. LOGIN
      if (action === "login") {
        const identifier = (username || email || "").trim().toLowerCase();
        if (!identifier || !password) {
          return jsonResponse({ success: false, message: "Username e password sono richiesti." }, 400);
        }

        const inputHash = await hashPassword(password);

        const found = users.find(u => {
          const isMatchIdentifier = (u.username?.toLowerCase() === identifier || u.email?.toLowerCase() === identifier);
          if (!isMatchIdentifier) return false;
          // Check hashed password or legacy plain text
          return u.passwordHash === inputHash || u.password === password;
        });

        if (!found) {
          return jsonResponse({ success: false, message: "Credenziali non valide. Verifica username e password." }, 401);
        }

        const { password: _, passwordHash: __, ...safeUser } = found;
        return jsonResponse({ success: true, user: safeUser });
      }

      // 2. REGISTER
      if (action === "register") {
        const cleanUsername = (username || "").trim().toLowerCase();
        const cleanEmail = (email || `${cleanUsername}@devexam.local`).trim().toLowerCase();

        if (!cleanUsername || !password) {
          return jsonResponse({ success: false, message: "Username e password sono obbligatori." }, 400);
        }

        const exists = users.some(u => 
          u.username?.toLowerCase() === cleanUsername || 
          u.email?.toLowerCase() === cleanEmail
        );

        if (exists) {
          return jsonResponse({ success: false, message: "Username o Email già in uso nel sistema." }, 409);
        }

        const hashed = await hashPassword(password);

        const newUser = {
          id: `user-${Date.now()}`,
          username: cleanUsername,
          email: cleanEmail,
          passwordHash: hashed,
          name: name?.trim() || cleanUsername,
          role: role === "admin" ? "admin" : "student",
          avatar: role === "admin" ? "👨‍🏫" : "👨‍💻",
          bio: role === "admin" ? "Docente & Amministratore della piattaforma." : "Studente in preparazione per l'esame.",
          targetGrade: "28/30",
          examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          apiKey: apiKey ? apiKey.trim() : "",
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await userStore.setJSON("all_users", users);

        const { passwordHash: _, ...safeUser } = newUser;
        return jsonResponse({ success: true, user: safeUser }, 201);
      }

      // 3. UPDATE PROFILE
      if (action === "update-profile") {
        if (!userId) {
          return jsonResponse({ success: false, message: "User ID non specificato." }, 400);
        }

        const idx = users.findIndex(u => u.id === userId);
        if (idx === -1) {
          return jsonResponse({ success: false, message: "Utente non trovato." }, 404);
        }

        const updated = { ...users[idx], ...updatedFields };
        if (updatedFields.password) {
          updated.passwordHash = await hashPassword(updatedFields.password);
          delete updated.password;
        }
        users[idx] = updated;
        await userStore.setJSON("all_users", users);

        const { password: _, passwordHash: __, ...safeUser } = updated;
        return jsonResponse({ success: true, user: safeUser });
      }

      return jsonResponse({ success: false, message: `Azione '${action}' non riconosciuta.` }, 400);
    }

    return jsonResponse({ success: false, message: "Metodo non consentito." }, 405);
  } catch (error) {
    return jsonResponse({ success: false, message: error.message || "Errore del server Netlify Blobs." }, 500);
  }
};

