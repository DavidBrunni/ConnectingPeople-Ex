# Hur du gör sidan live

Sidan består av **frontend** (Next.js) och **backend** (Express + MongoDB). Båda måste vara live för att allt ska fungera.

---

## Steg 1: Koden på GitHub

Om du inte redan gjort det:

1. Skapa ett repo på [github.com](https://github.com) (t.ex. `ConnectingPeople-Ex`).
2. Öppna terminal i projektmappen och kör:

```bash
git init
git add .
git commit -m "Första commit"
git branch -M main
git remote add origin https://github.com/DITT-ANVANDARNAMN/DITT-REPO.git
git push -u origin main
```

Byt ut `DITT-ANVANDARNAMN` och `DITT-REPO` mot ditt användarnamn och reponamn.

---

## Steg 2: Backend live (API)

Vercel kan bara hosta frontend. Backend måste ligga någon annanstans.

### Alternativ A: Render (gratis att börja)

1. Gå till [render.com](https://render.com) och logga in med GitHub.
2. **New** → **Web Service**.
3. Välj ditt repo (ConnectingPeople-Ex).
4. **Root Directory:** skriv `server`.
5. **Build Command:** `npm install`.
6. **Start Command:** `node server.js` eller `npm start`.
7. Under **Environment** lägg till:
   - `MONGODB_URI` = din MongoDB-URI (t.ex. från [MongoDB Atlas](https://www.mongodb.com/atlas))
   - `JWT_SECRET` = en lång slumpsträng (t.ex. generera på [randomkeygen.com](https://randomkeygen.com))
8. Klicka **Create Web Service**. Vänta tills den är grön.
9. **Kopiera URL:en** (t.ex. `https://connectingpeople-xxx.onrender.com`) – det är din backend-URL.

### Alternativ B: Railway

1. Gå till [railway.app](https://railway.app) och logga in med GitHub.
2. **New Project** → **Deploy from GitHub repo** → välj ditt repo.
3. I projektet: **Settings** → **Root Directory** → sätt till `server`.
4. **Variables** – lägg till `MONGODB_URI` och `JWT_SECRET` (samma som ovan).
5. **Deploy** – Railway bygger automatiskt. Kopiera **public URL** (din backend-URL).

---

## Steg 3: Frontend live på Vercel

1. Gå till [vercel.com](https://vercel.com) och logga in med GitHub.
2. **Add New** → **Project** → välj ditt repo (ConnectingPeople-Ex).
3. **Root Directory:** klicka **Edit**, skriv `client`, klicka **Continue**.
4. **Environment Variables:** klicka och lägg till:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** backend-URL:en från steg 2 (t.ex. `https://connectingpeople-xxx.onrender.com`)
   - Kryssa i **Production** (och ev. Preview).
5. Klicka **Deploy**. Vänta tills bygget är klart (några minuter).
6. Du får en länk, t.ex. `https://connectingpeople-ex.vercel.app` – **det är din live sida.**

---

## Steg 4: Testa

- Öppna Vercel-länken i webbläsaren. Du ska se landningssidan.
- Testa **Registrera** / **Logga in**. Om det fungerar pratar frontend rätt med backend.

---

## Sammanfattning

| Vad      | Var det ligger live                |
| -------- | ---------------------------------- |
| Frontend | Vercel (din .vercel.app-länk)      |
| Backend  | Render eller Railway (din API-URL) |
| Databas  | MongoDB Atlas (används av backend) |

Efter detta: när du ändrar något lokalt, kör `git add .` → `git commit -m "..."` → `git push`. Då bygger Vercel om frontend automatiskt, och Render/Railway bygger om backend om du ändrat under `server/`.
