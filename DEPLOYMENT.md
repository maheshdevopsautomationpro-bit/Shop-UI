# Deployment Guide - SAKTHI TEXTILES E-commerce

This guide will walk you through deploying your e-commerce website to production using Vercel and Supabase.

## Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] Supabase project set up
- [x] Domain name (optional, Vercel provides free subdomain)

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - SAKTHI TEXTILES e-commerce"

# Add remote repository
git remote add origin https://github.com/yourusername/shop-ui.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Build Locally

Before deploying, ensure your project builds successfully:

```bash
npm run build
```

Fix any errors before proceeding.

## Step 2: Set Up Supabase for Production

### 2.1 Production Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following scripts in order:

```sql
-- 1. Create tables
-- Run: supabase/schema.sql

-- 2. Set up security policies
-- Run: supabase/rls-policies.sql

-- 3. (Optional) Add sample data
-- Run: supabase/seed.sql
```

### 2.2 Create Admin User

```sql
-- Create admin user for production
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('your-admin-email@example.com', crypt('SecurePassword123!', gen_salt('bf')), NOW());

-- Add to admin_users table
INSERT INTO admin_users (id, email, full_name, role, active)
SELECT id, email, 'Admin Name', 'admin', true
FROM auth.users
WHERE email = 'your-admin-email@example.com';
```

### 2.3 Configure Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. Customize confirmation and password reset emails
3. Add your business branding

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Select the repository: `shop-ui`

### 3.2 Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables

Click **Environment Variables** and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Important**: 
- Get these values from Supabase Dashboard > Settings > API
- Add variables for all environments: Production, Preview, Development

### 3.4 Deploy

1. Click **Deploy**
2. Wait for the build to complete (2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to your project in Vercel
2. Navigate to **Settings** > **Domains**
3. Click **Add Domain**
4. Enter your domain: `www.arutperunjothijavulikadai.in`

### 4.2 Update DNS Records

Add these records in your domain registrar:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

### 4.3 Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` in Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://www.arutperunjothijavulikadai.in
```

Redeploy after changing environment variables.

## Step 5: Post-Deployment Configuration

### 5.1 Update Supabase Redirect URLs

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your production URL to **Site URL**:
   ```
   https://www.arutperunjothijavulikadai.in
   ```
3. Add to **Redirect URLs**:
   ```
   https://www.arutperunjothijavulikadai.in/admin/dashboard
   ```

### 5.2 Test Admin Login

1. Visit `https://your-domain.com/admin`
2. Login with your admin credentials
3. Verify all admin pages work correctly

### 5.3 Add Initial Content

1. Login to admin panel
2. Add categories
3. Add products with images
4. Create festival offers (if any)
5. Update site settings

## Step 6: Performance Optimization

### 6.1 Enable Vercel Analytics (Optional)

1. Go to your project in Vercel
2. Navigate to **Analytics**
3. Click **Enable Analytics**

### 6.2 Configure Caching

The project is already configured with:
- ISR (Incremental Static Regeneration) - 60 seconds
- Image optimization via Next.js Image component

### 6.3 Add Monitoring

Consider adding:
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Sentry](https://sentry.io/) for error tracking
- Google Analytics for traffic monitoring

## Step 7: Security Checklist

- [x] Environment variables are set correctly
- [x] Supabase RLS policies are enabled
- [x] Admin routes require authentication
- [x] HTTPS is enabled (automatic with Vercel)
- [x] Strong admin password is set
- [x] API keys are not exposed in client code

## Step 8: Backup Strategy

### 8.1 Database Backups

Supabase provides automatic daily backups. To enable:

1. Go to Supabase Dashboard > Database > Backups
2. Verify daily backups are enabled
3. Consider upgrading to Pro for point-in-time recovery

### 8.2 Code Backups

Your code is backed up on GitHub. Ensure:
- Regular commits
- Protected main branch
- Multiple collaborators (if applicable)

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update products"
git push

# Vercel will automatically deploy
```

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Environment Variables Not Working

1. Ensure variables are added for all environments
2. Redeploy after adding variables
3. Check variable names match exactly

### Database Connection Issues

1. Verify Supabase URL and keys
2. Check RLS policies allow public read access
3. Ensure service role key is correct

### Images Not Loading

1. Add image domains to `next.config.js`:
   ```js
   images: {
     domains: ['your-supabase-project.supabase.co'],
   }
   ```
2. Redeploy

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)

## Production Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database schema deployed
- [ ] Admin user created
- [ ] RLS policies enabled
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Admin panel accessible
- [ ] Test product pages load correctly
- [ ] WhatsApp links work
- [ ] Contact forms tested
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags verified
- [ ] Analytics configured
- [ ] Backup strategy in place

---

**Congratulations!** 🎉 Your e-commerce website is now live!
