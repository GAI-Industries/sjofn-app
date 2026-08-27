# SJÖFN

Event-based dating app by GAI Industries.

SJÖFN is a mobile dating platform focused on real interactions, event-based matching and controlled communication instead of endless swiping and unrestricted chat.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime
- Supabase Storage
- Supabase Edge Functions
- TanStack Query
- React Hook Form
- Zod
- Expo SecureStore
- ESLint
- Prettier
- EAS Build

## Project Structure

```text
app/
├── (auth)/
├── (tabs)/
├── event/
├── _layout.tsx
└── index.tsx

src/
├── components/
├── features/
│   ├── auth/
│   ├── onboarding/
│   ├── profile/
│   ├── discovery/
│   ├── events/
│   ├── reactions/
│   ├── matches/
│   ├── communication/
│   ├── notifications/
│   └── safety/
├── hooks/
├── lib/
├── services/
├── stores/
├── types/
├── utils/
└── constants/

assets/
├── images/
├── icons/
└── fonts/

supabase/
├── migrations/
└── seed.sql

Core Features

* User authentication
* Profile creation and onboarding
* Location-based discovery
* Event-based dating
* Speed-dating events
* Reactions and mutual matching
* Controlled communication stages
* Contact release after mutual interest
* Notifications
* Safety and moderation features

Communication Model

SJÖFN uses a staged communication model.

Stage 1 – Before contact release

Users can interact through:

* reactions
* icebreakers
* short replies

Unrestricted chat and direct contact details are not available at this stage.

Stage 2 – During events

Communication can be temporarily enabled and linked directly to the active event.

Stage 3 – After mutual interest

After mutual interest is confirmed, expanded communication or controlled contact release can become available.

Backend

Backend services are provided through Supabase.

The project uses:

* PostgreSQL database
* Authentication
* Row Level Security
* Realtime functionality
* File storage
* Edge Functions where required

Database changes should be managed through versioned migrations.

Security

* Row Level Security should be enabled for application tables.
* New database tables should not automatically be publicly exposed.
* Secrets and database passwords must never be committed to GitHub.
* Environment variables are stored locally and documented only through .env.example.
* Access permissions should follow the principle of least privilege.

Repository

This repository contains the mobile application and associated Supabase database configuration for SJÖFN.

Maintained by GAI Industries.

Status

Early development.
