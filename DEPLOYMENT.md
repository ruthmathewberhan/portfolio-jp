# Deploy to Vercel

The website and portal are deployed together as static files. `vercel.json` defines the build and output settings following [Vercel's project configuration](https://vercel.com/docs/project-configuration/vercel-json).

1. Push this repository to your Git provider and import it into Vercel.
2. Keep **Root Directory** at the repository root (`.`), not `website` or `jpII-portal`.
3. Use **Framework Preset: Other**. The repository configuration specifies **Build Command: `npm run build`** and **Output Directory: `dist`**. No environment variables are required.
4. Deploy.

Routes:

- `/`: college homepage.
- `/website/`: original website directory, retained for compatibility.
- `/website/assets/pages/film.html` and other existing department URLs remain valid.
- `/jpII-portal/`: student portal preview.
- `/jpII-portal/careers.html`: Careers.
- Legacy public Careers and Portal URLs redirect to the new locations.

Run `npm run build` and `npm test` locally with Node.js 24. The build checks source links, packages only web assets, and verifies all deployed HTML links. It replaces the generated `dist` folder. Source documentation, tests, package files, and build scripts are excluded from deployment. No external build dependencies are needed.

Serve `dist` with a static HTTP server for local preview. The portal uses ES modules and needs HTTP serving rather than opening files with `file://`.

Hosting does not add a backend: course inquiries still prepare email drafts, portal records are illustrative, and drafts are local to the tab. Authentication, official student records, payments, and server-side submissions remain future integrations. Existing pages load Tailwind from its CDN; fonts and some images also require external network access.
