# Publicera på Vercel

Frontend (Next.js) i `client/` kan publiceras på Vercel. Backend (Express) måste köras någon annanstans.

---

## 1. Backend först (nödvändigt)

Vercel hostar bara **frontend**. Express-servern i `server/` måste deployas separat, t.ex.:

- **Railway** – [railway.app](https://railway.app) (enkel med GitHub)
- **Render** – [render.com](https://render.com) (gratis tier)
- **Fly.io** – [fly.io](https://fly.io)

**Gör så här:**

1. Pusha `server/` till ett eget repo eller använd monorepo och sätt "Root" till `server` i tjänsten.
2. Sätt miljövariabler hos leverantören:
   - `MONGODB_URI` (t.ex. MongoDB Atlas)
   - `JWT_SECRET` (lång slumpsträng)
   - `PORT` (ofta sätts automatiskt)
3. Notera backend-URL:en, t.ex. `https://din-app.onrender.com` eller `https://xxx.railway.app`.

**CORS:** Servern använder `cors()` utan begränsning, så din Vercel-URL fungerar. Vill du begränsa kan du i `server/server.js` sätta t.ex.:

```js
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://din-app.vercel.app' }));
```

---

## 2. Frontend på Vercel

1. Gå till [vercel.com](https://vercel.com) och importera ditt GitHub-repo.
2. **Root Directory:** Sätt till **`client`** (Vercel → Project → Settings → General → Root Directory). Spara.
3. **Environment variables:** Under Settings → Environment Variables lägg till:
   - **Namn:** `NEXT_PUBLIC_API_URL`  
   - **Värde:** din backend-URL (t.ex. `https://din-app.onrender.com`)  
   - Välj Production (och Preview om du vill).
4. **Deploy:** "Deploy" / pusha till main – Vercel bygger och publicerar automatiskt.

Efter deploy använder sidan din backend-URL; inloggning, resor och meddelanden går mot den servern.

---

## 3. Checklista

| Steg | Status |
|------|--------|
| Backend deployad (Railway/Render/Fly.io) med MongoDB + JWT_SECRET | ☐ |
| Backend-URL noterad | ☐ |
| Vercel-projekt: Root Directory = `client` | ☐ |
| Vercel: `NEXT_PUBLIC_API_URL` = backend-URL | ☐ |
| Deploy körts (grön build) | ☐ |

---

## 4. Felsökning

- **"Failed to fetch" / nätverksfel:** Kontrollera att `NEXT_PUBLIC_API_URL` är rätt och att backend är uppe. Testa backend-URL i webbläsaren (t.ex. `https://din-api.onrender.com`).
- **CORS-fel:** Backend använder öppen CORS; om du ändrat till en specifik origin, lägg till din Vercel-URL (t.ex. `https://xxx.vercel.app`).
- **Build fel på Vercel:** Bygget körs i `client/` (npm install + next build). Om det faller lokalt med `npm run build` i `client/` måste det åtgärdas först.
