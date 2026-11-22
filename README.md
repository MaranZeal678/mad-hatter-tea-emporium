# The Mad Hatter's Tea Emporium

A small demo storefront for a whimsical, Wonderland-themed tea shop, built with
Next.js (App Router), TypeScript and Tailwind CSS. All products and orders are
synthetic and no real payment is taken.

## Features

- **Shop** (`/`) — four house teas with an "Add to cart" button each.
- **Cart** (`/cart`) — adjust quantities and see the subtotal. The cart lives in
  React context and is persisted to `localStorage`.
- **Checkout** (`/checkout`) — enter a name and email and place the order. Each
  successful order shows a confirmation card.
- **Orders** (`/orders`) — every order placed since the server started.
- **API** — `GET /api/orders` lists orders, `POST /api/orders` validates and
  creates one. Orders are kept in memory, so they reset when the server
  restarts. Order creation includes a short simulated payment-processing delay.

## Requirements

Node.js 22.12 or newer and npm.

## Running locally

```bash
npm ci
npm run dev          # development server on http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # honours the PORT environment variable (default 3000)
```

## Testing and linting

```bash
npm test             # vitest (jsdom + Testing Library)
npm run lint         # eslint
```

Unit tests live next to the code they cover (`src/**/*.test.ts(x)`).

## Project layout

```
src/
  app/                 routes (shop, cart, checkout, orders) and the orders API
  components/          client components (cart context, header, checkout form, …)
  lib/                 pure helpers: products, cart maths, order validation
```

<!-- simulated merged fix for reset test -->
