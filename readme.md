# Letters to Love — Frontend

A private love letter app. One person writes, one person reads. Letters unlock at a scheduled time each day, building a growing archive of moments between two people.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Data fetching | TanStack Query v5 |
| Backend | Supabase (DB + Auth + Storage) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Quicksand + Cormorant Garamond |

---

## Project Structure

```
src/
├── features/
│   ├── reader/                  # Everything the reader sees
│   │   ├── today/               # Today's letter(s) + countdown timer
│   │   ├── letter-detail/       # Full letter view with reactions & comments
│   │   ├── archive/             # Timeline of all past letters
│   │   ├── bookmarks/           # Saved letters
│   │   ├── search/              # Full-text search
│   │   └── reader-layout.tsx    # Floating nav + page transitions
│   └── admin/                   # Content management
│       ├── auth/                # Login screen
│       ├── dashboard/           # Stats + letter table
│       ├── letter-editor/       # Block-based letter editor
│       ├── comment-manager/     # Reply to comments
│       ├── media-manager/       # Upload/manage images, audio, video
│       └── admin-layout.tsx     # Sidebar navigation
├── shared/
│   ├── constants/               # Routes, moods, storage bucket name
│   ├── helpers/                 # Date formatting, ID generation, countdown target
│   ├── services/                # Supabase client (anon + service role)
│   ├── types/                   # Letter, Comment, Bookmark, Reaction
│   └── utils/                   # useTheme, useCountdown, useAdminAuth
└── ui/
    ├── components/              # Button, Input, Card, Badge, Modal, Logo, Spinner, EmptyState
    └── icons/                   # Barrel export from lucide-react
```

### Path Aliases

```
@app      → src/
@features → src/features/
@shared   → src/shared/
@ui       → src/ui/
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in this directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> The service role key is used only in the admin panel (client-side, private device). Never expose it publicly.

### 3. Run the Supabase schema

Open the Supabase SQL editor and run the contents of `../docs/supabase-schema.sql`. This creates the tables, indexes, RLS policies, and the `letter-media` storage bucket.

### 4. Create an admin user

In the Supabase dashboard → Authentication → Users → Invite user. Use that email/password to log in at `/admin/login`.

### 5. Start the dev server

```bash
npm run dev
```

---

## How It Works

### Letter visibility

Letters are not hidden by a cron job or a scheduled trigger. The query itself filters:

```sql
status = 'published' AND publish_at <= now()
```

No letters for today? The countdown timer shows how long until the configured reveal hour (default: 9pm). Set `COUNTDOWN_HOUR` in `src/shared/constants/index.ts`.

### Letter content

Each letter is a list of blocks stored as JSONB:

```ts
type RichContentBlock =
  | { type: 'text';  id: string; content: string }
  | { type: 'quote'; id: string; content: string }
  | { type: 'image'; id: string; url: string; caption?: string }
  | { type: 'video'; id: string; url: string; caption?: string }
  | { type: 'audio'; id: string; url: string }
```

### Media

Files are uploaded to the `letter-media` Supabase Storage bucket (public). The admin can copy a file's URL and paste it into an image/audio/video block in the letter editor.

### Comments

The reader can leave comments (`author = 'reader'`). The admin replies from the dashboard (`author = 'admin'`). Replies are threaded via `parent_id`.

### Reactions

Five emoji reactions per letter: ❤️ 🥹 😂 ⭐ 🥰. No deduplication — every tap adds one. Counts aggregate per emoji type.

---

## Design System

### Colors

| Token | Value | Used for |
|---|---|---|
| `brand-yellow` | `#F5C842` | Primary actions, milestone badges |
| `romantic-cream` | `#FFF8F0` | Page background |
| `romantic-rose` | `#F4A0A8` | Accents, active states |
| `romantic-blush` | `#F9B8C0` | Hover states, light fills |
| `romantic-brown` | `#3D1F1F` | Primary text |

Dark mode is class-based (`dark` on `<html>`), toggled via `useTheme` hook, persisted to `localStorage`.

### Typography

- **Quicksand** — UI text, labels, buttons (weights 300–700)
- **Cormorant Garamond** — Display headings, letter titles, quotes. Use `font-display` class.

### Animations

| Class / Hook | Effect |
|---|---|
| `animate-heartbeat` | Lub-dub double beat (0.9s) |
| `animate-float` / `float-slow` / `float-fast` | Gentle drift for decorative hearts |
| `animate-glow-pulse` | Pulsing box-shadow glow |
| `animate-draw-line` | ScaleY 0→1 for timeline lines |
| Framer Motion `layoutId="nav-pill"` | Sliding active indicator in nav |
| Framer Motion `AnimatePresence` | Page transitions + split-flap digits |
| View Transitions API | Circular wipe on dark mode toggle |

---

## Admin Panel

| Route | Screen |
|---|---|
| `/admin/login` | Email + password login |
| `/admin/dashboard` | Stats overview + letters table |
| `/admin/letters/new` | Create a letter |
| `/admin/letters/:id/edit` | Edit a letter |
| `/admin/comments` | View + reply to comments |
| `/admin/media` | Upload and manage media files |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Type-check + production build
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

---

## Deployment

Build output is in `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages). Set the three `VITE_` environment variables in your host's dashboard.

For SPA routing, configure your host to serve `index.html` for all routes.
