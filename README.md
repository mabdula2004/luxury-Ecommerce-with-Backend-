# ATELIER — Luxury E-commerce with Supabase

A client-ready full-stack React commerce portfolio project built around a restrained editorial luxury system rather than a generic storefront template.

## Experience

- Editorial responsive home experience with premium typography and art direction
- Live Supabase product catalog with loading, empty and error states
- Search, price filtering and price/curated sorting
- Product detail routes with size/colour selection
- Authenticated persistent cart with quantity updates and deletion
- Authenticated wishlist backed by Postgres
- Email/password sign-up and sign-in through Supabase Auth
- Private account surface and sign-out
- Checkout address flow and persisted orders/order items
- Responsive desktop, tablet and mobile layouts
- Hover/focus/selected/disabled/success states
- Portfolio-safe checkout: **no real card data is collected**

## Architecture

```text
React + Vite
  ├─ React Router
  ├─ Supabase JS browser client
  └─ Responsive editorial design system
          │
          ▼
Supabase
  ├─ Auth
  ├─ Postgres
  │   ├─ profiles
  │   ├─ categories
  │   ├─ products
  │   ├─ wishlist_items
  │   ├─ cart_items
  │   ├─ orders
  │   └─ order_items
  ├─ Row Level Security
  └─ product-media Storage bucket
```

## Security / RLS

The catalog can be read publicly. User-owned data is protected with RLS using `auth.uid()` so a signed-in client can only read or mutate its own profile, wishlist, cart and orders. The browser receives only a Supabase publishable/anon key; **never expose a service-role or secret key in Vite environment variables.**

The database migration and catalog seed have been applied to the dedicated `Luxury E-commerce Store` Supabase project (`kzexzrdiyzjjtmzrgkiy`). The repo includes a migration note under `supabase/migrations/` and the full applied SQL remains available in Supabase migration history.

## Local setup

```bash
git clone https://github.com/mabdula2004/luxury-Ecommerce-with-Backend-.git
cd luxury-Ecommerce-with-Backend-
npm install
cp .env.example .env
npm run dev
```

Set:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_BROWSER_SAFE_KEY
```

## Build

```bash
npm run build
npm run preview
```

## QA checklist

- Desktop, tablet and phone breakpoints
- Catalog loading/empty/error states
- Search, range filter and sorting
- Product selection and wishlist state
- Sign-up/sign-in/sign-out
- Persistent authenticated cart CRUD
- Checkout validation, disabled/loading state and order success response
- RLS isolation for user-owned rows

## Screens / visual direction

The interface uses an original **ATELIER** identity: warm paper surfaces, ink typography, oversized editorial serif display type, restrained micro-labels and photography-led layouts. Reference research focused on recurring patterns in current high-end fashion commerce and award-gallery work—large editorial imagery, sparse navigation, deliberate whitespace, tactile neutrals and product-first interaction—without reproducing any one site.

> Add captured working-project screenshots under `docs/screenshots/` after deployment/browser capture. The README intentionally does not pretend static mockups are verified screenshots.

## Backend note

This portfolio demonstrates a real database-connected order workflow. Payment is intentionally represented as `demo_pending`; production payment processing would use a provider such as Stripe through a trusted server/Edge Function rather than handling card details in the React client.

## License

Portfolio/educational project by Muhammad Abdullah.