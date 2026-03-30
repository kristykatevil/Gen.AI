# Tripo-Like 3D Generator Starter

A Next.js 14 starter app for a Tripo-like 3D generation product running on Replit.

## Features
- Text to 3D generation
- Image to 3D generation
- Async job tracking
- Project library
- 3D model preview panel
- STL export
- Mock generation engine (no external APIs required)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Storage**: Local JSON file (`data/db.json`) + local file system
- **Port**: 5000

## Project Structure
```
app/                  # Next.js app directory
  api/                # API routes
    generate/         # Generation endpoints (text-to-3d, image-to-3d)
    projects/         # Project CRUD
    jobs/             # Job status
  app/                # App pages
    create/           # Creation studio
    projects/[id]/    # Project workspace
components/           # React components
  Nav.tsx
  CreateStudio.tsx
  ProjectWorkspace.tsx
  PrimitiveViewer.tsx
lib/                  # Utilities
  db.ts               # JSON database helpers
  types.ts            # TypeScript types
  shape.ts            # STL generation
  format.ts           # Formatting utils
  providers/          # Generation provider abstraction
data/
  db.json             # Local JSON database
public/
  uploads/            # Uploaded images
  generated/          # Generated STL files
scripts/
  reset-db.mjs        # Reset database script
```

## API Routes
- `POST /api/generate/text-to-3d`
- `POST /api/generate/image-to-3d`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/jobs/:id`

## Pages
- `/` — Landing page
- `/app` — Dashboard
- `/app/create` — Generation studio
- `/app/projects/[projectId]` — Project workspace

## Development
The dev server runs on `0.0.0.0:5000` with `npm run dev`.

## Deployment
Configured for autoscale deployment. Build: `npm install && npm run build`. Run: `npm run start`.

## Upgrade Path
1. Swap local JSON for PostgreSQL or Supabase
2. Add authentication
3. Add Stripe billing
4. Replace mock provider with real 3D generation API
5. Add object storage (S3) and signed URLs
