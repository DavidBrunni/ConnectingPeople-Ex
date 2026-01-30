# Plan: Forums & Events

Kort översikt för hur Forums och Events kan byggas vidare.

---

## Forums (destination-forum)

**Idé:** Diskussioner per destination (t.ex. "Tokyo tips", "Barcelona").

**Backend:**
- Modell: `Forum` eller `ForumThread` (destination, titel, innehåll, skapad av, datum).
- Modell: `ForumPost` (tråd, innehåll, skapad av, datum).
- API: `GET /api/forums?destination=Tokyo` (lista trådar), `GET /api/forums/:id` (tråd + inlägg), `POST /api/forums` (skapa tråd), `POST /api/forums/:id/posts` (skriv inlägg).

**Frontend:**
- Forums-sida: lista destinationer eller trådar, sök/filter på destination.
- Klicka på en tråd → trådsida med inlägg och formulär för nytt inlägg.
- "Skapa tråd" (inloggad): välj destination, titel, första inlägg.

---

## Events (meetups)

**Idé:** Meetups kopplade till destination och datum (kan kopplas till resor eller vara fristående).

**Backend:**
- Modell: `Event` (titel, destination, datum/tid, beskrivning, skapad av, deltagare [referenser till User]).
- API: `GET /api/events?destination=...&dateFrom=...&dateTo=...`, `GET /api/events/:id`, `POST /api/events` (skapa), `POST /api/events/:id/join` (anmäl dig).

**Frontend:**
- Events-sida: lista events med filter (destination, datum).
- Klicka på event → event-sida med detaljer och "Join" / "Leave".
- "Skapa event" (inloggad): titel, destination, datum, beskrivning.

---

## Prioritering

1. **Messaging** – så att "Contact" från sökresultat och publik profil leder till riktig chatt (t.ex. WebSocket eller polling med messages-API).
2. **Forums** – enkla trådar per destination.
3. **Events** – meetups med join/leave.

Om du vill börja med Forums eller Events först kan vi ta det steg för steg (modeller → API → sidor).
