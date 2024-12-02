# CaptainSde UGC

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Project Structure
Pages
Home Page (src/app/page.tsx): Displays the main content with navigation, posts, and a display section. It fetches data from the /api/fetch-content endpoint and updates every 5 seconds.
New Post Page (src/app/new-post/page.tsx): Allows users to create a new post. The form data is sent to the /api/upload-content endpoint.
Edit Post Page (src/app/edit-post/page.tsx): Allows users to edit an existing post. The form data is sent to the /api/edit-post endpoint.
View Post Page (src/app/view-post/page.tsx): Displays the content of a single post fetched from the /api/view-post endpoint.
Components
Navigation (src/components/navigation.tsx): The navigation component that is displayed as a sidebar on larger screens and as a slide-out menu on mobile devices.
Posts (src/components/posts.tsx): Displays a list of post cards.
PostCard (src/components/postcard.tsx): Displays a single post card with options to view, edit, or delete the post.
Display (src/components/display.tsx): Displays additional information or content.
Footer (src/components/Footer.tsx): The footer component of the website.
API Routes
Fetch Content (src/app/api/fetch-content/route.ts): Fetches all content from the database.
Upload Content (src/app/api/upload-content/route.ts): Handles the creation of new posts.
Edit Post (src/app/api/edit-post/route.ts): Handles the updating of existing posts.
View Post (src/app/api/view-post/route.ts): Fetches a single post by ID from the database.
Utilities
Supabase Client
Supabase Client (src/utils/supabaseClient.js): Initializes the Supabase client for interacting with the Supabase database.
Markdown to HTML (src/utils/markdownToHtml.ts): Converts markdown content to HTML.
Environment Variables
Create a .env.local file in the root of your project and add the following environment variables:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.