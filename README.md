# Telegram Mini App

### Run Guide

1. Copy the `.env.dev` file to `.env`.

2. Create a Postgres database as defined in the `DATABASE_URL` variable in the `.env` file.

3. Create an `.npmrc` file (placed in the user’s home directory) to allow installing modules from `@roxavn`:

```
//npm.pkg.github.com/:_authToken=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
@roxavn:registry=https://npm.pkg.github.com
```

4. Install dependencies:

```
npm ic
```

5. Sync `roxavn` modules:

```
npx roxavn sync
// run database migration
npx roxavn migration:up
// create admin user and roles
npx roxavn hook
```

6. Start the development server:

```
npm run dev
```

### System Overview

1. The system includes an admin tool accessible via [this link](http://localhost:5173/login?ref=%2Fadmin%2Fapps).  
   **Admin credentials:** `admin` / `admin`.

2. The system includes a web interface for the Telegram Mini App accessible at `http://localhost:5173`.  
   Normally, the mini app is only accessible when opened through the Telegram mini app (due to Telegram login requirements).  
   To access `http://localhost:5173` directly, you must first log in via `http://localhost:5173/login`.
