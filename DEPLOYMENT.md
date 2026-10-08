# MUSAFIRCAFE — DEPLOYMENT GUIDE

## 1. Deploying to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete MusafirCafe production release"
   git remote add origin https://github.com/<your-username>/musafircafe.git
   git push -u origin main
   ```

2. **Import Project into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your `musafircafe` GitHub repository.
   - Framework preset: **Next.js**.
   - Root directory: `./`

3. **Configure Environment Variables in Vercel**:
   Add the following variables in the Vercel Project Settings:
   - `SESSION_SECRET`: `[generate a secure 32+ char key]`
   - `ADMIN_PASSWORD`: `[choose a strong owner password]`
   - `NEXT_PUBLIC_SITE_URL`: `https://musafircafe.com`

4. **Click Deploy**:
   Vercel will compile the Next.js production build and deploy to a global edge network with automatic SSL.

---

## 2. Connecting a Custom Domain (musafircafe.com)

1. In Vercel Project Settings, navigate to **Domains**.
2. Add your custom domain: `musafircafe.com` and `www.musafircafe.com`.
3. In your DNS Registrar (Namecheap, Cloudflare, Google Domains):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. Vercel automatically provisions a free Let's Encrypt TLS/SSL certificate with automatic renewal.

---

## 3. Alternative: Firebase Hosting (SSG/SSR)

If deploying to Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting,firestore,storage
```
