# SAKTHI TEXTILES - E-commerce Website

A modern, production-ready e-commerce website for **ARUTPERUNJOTHI JAVULI KADAI (SAKTHI TEXTILES)**, built with Next.js 14, React, Supabase, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.39-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🌟 Features

### Customer-Facing Features
- **Product Catalog**: Browse products by category with beautiful card layouts
- **Product Details**: Comprehensive product pages with image galleries
- **Festival Offers**: Dynamic promotional offers with automatic pricing
- **WhatsApp Integration**: Direct product inquiries via WhatsApp
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper meta tags and semantic HTML for better search rankings

### Admin Features
- **Secure Admin Panel**: Protected admin dashboard with authentication
- **Product Management**: Full CRUD operations for products
- **Category Management**: Organize products with drag-and-drop ordering
- **Festival Offers**: Create and manage time-bound promotional offers
- **Site Settings**: Configure business information and social media links
- **Real-time Updates**: Changes reflect immediately on the website

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
Shop-UI/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin panel pages
│   │   ├── categories/      # Category management
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── offers/          # Festival offers management
│   │   ├── products/        # Product management
│   │   └── settings/        # Site settings
│   ├── about/               # About page
│   ├── category/[slug]/     # Category listing page
│   ├── contact/             # Contact page
│   ├── privacy/             # Privacy policy
│   ├── products/            # All products listing
│   │   └── [slug]/          # Product detail page
│   ├── terms/               # Terms & conditions
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── home/               # Home page components
│   ├── layout/             # Layout components (Header, Footer)
│   └── product/            # Product components
├── lib/                     # Utility libraries
│   ├── supabase/           # Supabase client and queries
│   ├── pricing.ts          # Pricing calculations
│   └── utils.ts            # Helper functions
├── supabase/               # Database schema and migrations
│   ├── schema.sql          # Database schema
│   ├── rls-policies.sql    # Row Level Security policies
│   └── seed.sql            # Sample data
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Shop-UI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Go to **SQL Editor** and run the following files in order:
   - `supabase/schema.sql` - Creates database tables
   - `supabase/rls-policies.sql` - Sets up security policies
   - `supabase/seed.sql` - Adds sample data (optional)

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Where to find these values:**
- Go to your Supabase project settings
- Navigate to **API** section
- Copy the **Project URL** and **anon/public** key

### 5. Create Admin User

In Supabase SQL Editor, run this script to create your admin account:

```sql
-- 1. Clean up existing records if any
DELETE FROM admin_users WHERE email = 'mahesh.devops.automationpro@gmail.com';
DELETE FROM auth.users WHERE email = 'mahesh.devops.automationpro@gmail.com';

-- 2. Create the user in Supabase Auth
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role, last_sign_in_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
    gen_random_uuid(),
    'mahesh.devops.automationpro@gmail.com',
    crypt('Manh@#8123957289', gen_salt('bf')),
    now(),
    'authenticated',
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}'
);

-- 3. Link to our admin_users table
INSERT INTO admin_users (id, email, full_name, role, active)
SELECT id, email, 'Mahesh (Admin)', 'admin', true
FROM auth.users
WHERE email = 'mahesh.devops.automationpro@gmail.com';
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Add environment variables from `.env.local`
6. Click **Deploy**

### Environment Variables for Production

Make sure to add these in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## 🔐 Admin Access

- **URL**: `https://your-domain.com/admin`
- **Login**: Use the admin credentials you created in Supabase

## 📝 Configuration

### Business Information

Update business details in:
- `components/layout/Footer.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`

Or use the **Admin Settings** page after logging in.

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Color scheme: Modify CSS variables in `globals.css`

## 🗄️ Database Schema

### Main Tables

- **categories**: Product categories
- **products**: Product catalog
- **festival_offers**: Promotional offers
- **payment_settings**: Payment gateway configuration
- **site_settings**: Dynamic site configuration
- **admin_users**: Admin user metadata

See `supabase/schema.sql` for complete schema.

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin routes protected with authentication
- Secure API routes with service role key
- Input validation and sanitization

## 📱 Contact

**ARUTPERUNJOTHI JAVULI KADAI**  
Brand: SAKTHI TEXTILES

- **Address**: 2ND FLOOR, NO: 19, ELLORA COMPLEX, BROUGH ROAD, ERODE – 638001, TAMIL NADU, INDIA
- **Phone**: +91 97509 96633, +91 95666 09636
- **Email**: info@arutperunjothijavulikadai.in
- **GSTIN**: 33DGMPS4403N1ZZ

## 📄 License

This project is proprietary software for ARUTPERUNJOTHI JAVULI KADAI.

## 🤝 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for SAKTHI TEXTILES**
