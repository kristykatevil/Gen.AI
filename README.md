# Tripo-Like 3D Generator Starter for Replit

This is a **Replit-ready starter app** for a Tripo-like product:
- text to 3D
- image to 3D
- async job tracking
- project library
- placeholder preview panel
- STL export placeholder
- provider abstraction for later API integration

## What this starter is
This project gives you the **full product skeleton** and a **mock generation engine** so the app works immediately on Replit without external services.

## What this starter is not
This is **not** a production 3D generation model. It simulates provider behavior and gives you the places to plug in a real engine later.

## Run on Replit

### Option A: import from GitHub
1. Put this project in a GitHub repo.
2. In Replit, create a new app using **Import from GitHub**.
3. Replit will read `.replit` and `replit.nix`.
4. Click **Run**.

### Option B: upload files into a new Replit Node.js app
1. Create a new Replit app.
2. Replace its files with this project.
3. Click **Run**.

The app runs on port `3000` and listens on `0.0.0.0`.

## Core routes

### Pages
- `/` landing page
- `/app` dashboard
- `/app/create` generation studio
- `/app/projects/[projectId]` result workspace

### API
- `POST /api/generate/text-to-3d`
- `POST /api/generate/image-to-3d`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/jobs/:id`

## Data model
The starter stores local data in:
- `data/db.json`
- uploaded images in `public/uploads`
- generated STL placeholders in `public/generated`

## Next upgrades
1. swap local JSON storage for Postgres or Supabase
2. add auth
3. add Stripe billing
4. replace mock provider with a real 3D generation API
5. replace placeholder STL generation with real mesh conversion
6. add object storage and signed URLs
