# Auth Routing & Login Troubleshooting Guide

This note captures the fixes applied to resolve `/auth/login` failures in the Next.js 16 app router project, so you can reuse the same approach later.

## 1. Route Placement
- Place login/register screens under `app/(auth)/auth/...` so the resolved paths are `/auth/login` and `/auth/register`.
- Example structure:
  ```
  app/
    (auth)/
      auth/
        login/
          page.tsx
          form.tsx
        register/
          page.tsx
  ```

## 2. Login Page Refactor (`app/(auth)/auth/login/page.tsx`)
- Mark the page as a client component with `"use client"`.
- Use a shared `login()` helper from `lib/api/auth.ts` to centralize API calls to `/api/auth/login`.
- After a successful response:
  - Persist the JWT in both `localStorage` **and** `document.cookie` (middleware reads cookies).
  - Redirect to `/dashboard/{role}` with `router.push`.
- Surface API errors via component state.

## 3. Login Form Component (`form.tsx`)
- This must also be a client component (`'use client';`).
- Controlled inputs for `email` and `password` that call `onSubmit` with `{ email, password }`.
- Display inline error messages and disable the submit button while `isSubmitting` is true.

## 4. Axios + Auth Helpers (`lib/api/axios.ts`, `lib/api/auth.ts`)
- `axios.ts`: create an instance with `baseURL` pointing to your Flask API (e.g., `http://127.0.0.1:5000`). Attach the JWT from `localStorage` to every request via an interceptor.
- `auth.ts`: export typed helpers:
  ```ts
  export interface LoginPayload { email: string; password: string }
  export const login = (payload) => api.post('/api/auth/login', payload)
  export const fetchCurrentUser = () => api.get('/api/auth/me')
  ```

## 5. Auth Redirect Proxy (`proxy.ts`)
- This runs on every request to enforce authentication.
- Skip redirect logic for static assets, icons, `/_next/*`, `/api/*`, etc., so JS chunks aren’t rewritten to HTML (prevents `Unexpected token '<'`).
  ```ts
  const isAssetRequest = pathname.startsWith('/_next') || pathname.startsWith('/api') || ...
  if (isAssetRequest) return NextResponse.next();
  ```
- Maintain a `Set` of public routes (`/`, `/auth/login`, `/auth/register`). Redirect unauthenticated users on any other path to `/auth/login`.

## 6. Housekeeping
- After structural changes, remove `.next/` to clear stale Turbopack artifacts.
- Run `npm run lint` to ensure no TypeScript/eslint errors remain.
- Restart `npm run dev` and verify the `/auth/login` network requests return JS rather than HTML.

## Reuse Checklist
1. Confirm routes live under `app/(auth)/auth/*` (or update middleware expectations).
2. Ensure client components (`page.tsx`, `form.tsx`) start with the correct `'use client'` directive.
3. Persist JWT to both `localStorage` and cookies if middleware relies on cookies.
4. Update your proxy/middleware to ignore `/_next`, `/api`, and static assets before enforcing auth redirects.
5. Clear build cache, restart dev server, and verify via DevTools → Network that chunk requests aren’t redirected.

Following this flow resolved the 404 loops and the `Unexpected token '<'` bundle errors on Next.js 16.

