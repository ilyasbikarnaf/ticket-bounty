# 🎫 Ticket Bounty

A full-stack web application for managing support tickets with a bounty system — built with **Next.js**, **Prisma ORM**, **shadcn/ui**, and **TypeScript**.

---

## 📖 What is Ticket Bounty?

Ticket Bounty is a modern ticketing platform where users can create, browse, and manage tickets (bugs, feature requests, tasks, etc.) and optionally attach bounties to them. It's type-safe end-to-end with a clean UI and a Supabase-powered PostgreSQL backend.

---

## 🧰 Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Framework     | [Next.js](https://nextjs.org/) (App Router)    |
| Language      | TypeScript                                     |
| Database      | [Supabase](https://supabase.com/) (PostgreSQL) |
| ORM           | [Prisma](https://www.prisma.io/)               |
| UI Components | [shadcn/ui](https://ui.shadcn.com/)            |
| Styling       | Tailwind CSS                                   |

---

## ✅ Prerequisites

Before you start, make sure you have:

- **Node.js** v18+ — [Download here](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)
- A **Supabase** account and project — [Create one free](https://supabase.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ilyasbikarnaf/ticket-bounty.git
cd ticket-bounty
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

Then open `.env` and fill in your Supabase connection strings:

```env
# Connection pooler — used by the app at runtime (port 6543, Transaction Mode via PgBouncer)
DATABASE_URL="postgresql://postgres.<your-project-ref>:<your-password>@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection — used by Prisma Migrate only (port 5432, Session Mode)
DIRECT_URL="postgresql://postgres.<your-project-ref>:<your-password>@aws-1-eu-west-2.pooler.supabase.com:5432/postgres"
```

> **Where to find these?**
> In your [Supabase dashboard](https://supabase.com/dashboard), go to your project → **Settings → Database → Connection string**. Copy the **Transaction mode** URL into `DATABASE_URL` and the **Session mode** URL into `DIRECT_URL`.

> **Why two URLs?**
> Prisma uses `DATABASE_URL` for all runtime queries through PgBouncer (fast, pooled connections). It uses `DIRECT_URL` only when running migrations, which require a persistent session that PgBouncer doesn't support.

### 4. Set Up the Database

Generate the Prisma client and apply the schema to your Supabase database:

```bash
# Generate the Prisma client
npx prisma generate

# Apply the schema to your database
npx prisma db push
```

> For production, prefer migrations over `db push`: `npx prisma migrate deploy`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
ticket-bounty/
├── prisma/
│   └── schema.prisma       # Database schema (models & relations)
├── prisma.config.ts        # Prisma configuration
├── public/                 # Static assets
├── src/
│   └── app/                # Next.js App Router pages & layouts
├── .env.example            # Example environment variables (safe to commit)
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🛠️ Available Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start dev server at `http://localhost:3000` |
| `npm run build` | Build for production                        |
| `npm run start` | Start production server (after build)       |
| `npm run lint`  | Lint the codebase with ESLint               |

### Prisma Commands

| Command                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `npx prisma generate`    | Regenerate Prisma client (run after schema changes)     |
| `npx prisma db push`     | Sync schema to the database (good for development)      |
| `npx prisma migrate dev` | Create & apply a migration (recommended for production) |
| `npx prisma studio`      | Open visual database browser at `http://localhost:5555` |

---

### Deploy to Vercel (Recommended)

1. Push your code to GitHub.
2. Import the repository at [vercel.com](https://vercel.com).
3. Add both environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL` — your Supabase pooler URL (port 6543)
   - `DIRECT_URL` — your Supabase direct URL (port 5432)
4. Click **Deploy**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ilyasbikarnaf/ticket-bounty)

---

## ❓ Troubleshooting

**Database connection errors at runtime**
Check that `DATABASE_URL` uses port `6543` and includes `?pgbouncer=true` at the end.

**Migration errors (`prepared statement` or session errors)**
Check that `DIRECT_URL` uses port `5432` with no `pgbouncer=true`. Prisma automatically uses `DIRECT_URL` for migrations if it's set in `schema.prisma`.

**Prisma client out of sync after schema changes**
Run `npx prisma generate` again.

**Port 3000 already in use**
Run on a different port: `npm run dev -- -p 3001`

---

## 📄 License

This project is open source. See the repository for details.

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/) by Vercel
- [Supabase](https://supabase.com/) — open source Firebase alternative
- [Prisma ORM](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
