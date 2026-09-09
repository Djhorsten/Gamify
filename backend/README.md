# Pixelhaven API

REST API voor de Pixelhaven-webshop (game-winkel), gebouwd met **Express**,
**TypeScript**, **Zod** (validatie) en **Prisma** (ORM, SQLite).

## Starten

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

De server draait dan op `http://localhost:3000`. De migratie seedt automatisch
de database met categorieën, producten en een demo-account
(`demo@example.com` / `demo1234`). Opnieuw seeden kan met:

```bash
npm run prisma:seed
```

## Endpoints

| Methode | Pad                  | Auth | Omschrijving                          |
|---------|----------------------|------|----------------------------------------|
| GET     | /health              |      | Health check                           |
| GET     | /categories          |      | Alle categorieën                       |
| GET     | /products            |      | Producten (query: category, search, sort) |
| GET     | /products/:slug      |      | Eén product                            |
| POST    | /auth/register       |      | Account aanmaken                       |
| POST    | /auth/login          |      | Inloggen                               |
| GET     | /account             | ✓    | Eigen accountgegevens                  |
| PATCH   | /account             | ✓    | Accountgegevens wijzigen               |
| GET     | /orders              | ✓    | Eigen bestellingen                     |
| GET     | /orders/:id          | ✓    | Eén bestelling                         |
| POST    | /orders              | ✓    | Bestelling plaatsen                    |
| PATCH   | /orders/:id/cancel   | ✓    | Bestelling annuleren                   |

Beveiligde routes verwachten een `Authorization: Bearer <token>` header, met
het token dat `/auth/login` of `/auth/register` teruggeeft. Dit token is
**niet productie-veilig** (zie `src/lib/token.ts`) — voldoende voor de
frontend-flow van dit oefenproject.

## Structuur

```
src/
  index.ts                 # Express app + server start
  db.ts                    # Prisma client singleton
  lib/token.ts              # Simpel (onveilig) auth-token
  middleware/validate.ts    # Generieke Zod-validatiemiddleware
  middleware/auth.ts        # requireAuth-middleware
  schemas/                  # Zod-schema's per resource
  routes/                   # Express routers per resource
prisma/schema.prisma        # Databasemodel (SQLite)
prisma/seed.ts              # Seed-data (categorieën, producten, demo-account)
```

## Database wisselen

Standaard gebruikt dit project SQLite (handig lokaal, geen server nodig).
Voor PostgreSQL of MySQL: pas `provider` en `DATABASE_URL` in
`prisma/schema.prisma` en `.env` aan, en run opnieuw `npx prisma migrate dev`.

---

## Frontend (`frontend/`)

```bash
cd frontend
npm install
npm run dev
```

React + TypeScript + TanStack Query + React Router + Sass. Zie de
projectstructuur in `frontend/src` (`api/`, `components/ui/`, `features/`,
`pages/`, `router/`, `styles/`, `types/`) voor de opzet.
