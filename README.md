# UGC Cline - a chat app

A **Next.js + TypeScript** content-sharing app with real-time CRUD operations, powered by Supabase and styled with Tailwind CSS.

---

## 🚀 Features

- **Home Feed**  
  - Displays a live-updating list of all posts (polled every 5 seconds).  
  - Each post shown as a card with title, excerpt and action buttons.

- **Create New Post**  
  - Rich text content entry (Markdown).  
  - Client-side form validation.  
  - Submits to `/api/upload-content`.

- **Edit Existing Post**  
  - Load post data into form.  
  - Update title/content and save via `/api/edit-post`.

- **View Single Post**  
  - Render full Markdown content as HTML.  
  - Load via `/api/view-post?id=<postId>`.

- **Responsive Navigation**  
  - Sidebar menu on desktop.  
  - Slide-out drawer on mobile.  

- **Reusable Components**  
  - `Navigation` – site nav panel  
  - `Posts` – list wrapper  
  - `PostCard` – individual post preview  
  - `Display` – generic content section  
  - `Footer` – app footer  

- **API Routes (Next.js Serverless)**  
  - `GET /api/fetch-content` – fetch all posts  
  - `POST /api/upload-content` – create a post  
  - `PUT /api/edit-post` – update a post  
  - `GET /api/view-post` – fetch one post  

- **Supabase Integration**  
  - Client initialized in `src/utils/supabaseClient.js`  
  - Database for persisting posts  

- **Markdown-to-HTML**  
  - Converter utility in `src/utils/markdownToHtml.ts`  

- **Styling & Layout**  
  - Tailwind CSS (configured in `tailwind.config.ts`)  
  - Mobile-first, responsive design  
  - Custom font via Next.js font optimization  

- **Deployment**  
  - Live at [round2-ugc.vercel.app](https://round2-ugc.vercel.app)  
  - Vercel-ready (`vercel.json`)

---

## 📦 Getting Started

1. **Clone & Install**  
   ```bash
   git clone https://github.com/Somanath-03/round2UGC.git
   cd round2UGC
   npm install

2. **Configure Environment**
   Create a `.env.local` in project root with:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. **Run Locally**

   ```bash
   npm run dev
   # Open http://localhost:3000
   ```
4. **Build & Deploy**

   ```bash
   npm run build
   npm run start
   ```

   Or push to GitHub and let Vercel auto-deploy.

---

## 📁 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx            # Home feed
│   │   ├── new-post/page.tsx   # Create post
│   │   ├── edit-post/page.tsx  # Edit post
│   │   └── view-post/page.tsx  # View single post
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Posts.tsx
│   │   ├── PostCard.tsx
│   │   ├── Display.tsx
│   │   └── Footer.tsx
│   └── utils/
│       ├── supabaseClient.js
│       └── markdownToHtml.ts
├── pages/api/                  # (if using pages dir)  
├── .eslintrc.json              # Lint rules  
├── tailwind.config.ts  
├── next.config.ts  
└── package.json
```
