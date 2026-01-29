# Connecting People – Backend

Express + MongoDB API för auth och användare.

## Setup

1. Kopiera `.env.example` till `.env` och sätt `MONGODB_URI` och `JWT_SECRET`.
2. Se till att MongoDB körs lokalt (eller använd t.ex. MongoDB Atlas och sätt `MONGODB_URI`).
3. `npm install`
4. `npm run dev` – startar servern på port 5000.

## API

### Auth

- **POST /api/auth/register** – Registrera användare  
  Body: `{ "name", "email", "password" }`  
  Returnerar: `{ token, user: { id, name, email } }`

- **POST /api/auth/login** – Logga in  
  Body: `{ "email", "password" }`  
  Returnerar: `{ token, user: { id, name, email } }`

### Användare (kräver `Authorization: Bearer <token>`)

- **GET /api/users/me** – Hämta inloggad användares profil.
- **PATCH /api/users/me** – Uppdatera profil. Body: `{ "name?", "bio?", "interests?" }`.

## Mappstruktur

- `config/db.js` – MongoDB-anslutning
- `models/User.js` – Användarmodell (namn, e-post, lösenord, bio, intressen)
- `middleware/auth.js` – JWT-auth
- `routes/auth.js` – register / login
- `routes/users.js` – /me (profil)

## Tester

`npm test` – kör Jest (supertest mot appen; GET / testas utan DB).
