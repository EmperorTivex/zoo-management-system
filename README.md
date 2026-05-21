# Zoomania

A React zoo management web app for visitors and staff. Visitors can browse animals, book tickets, and manage their profile. Staff can manage animals and bookings from a protected dashboard.

Data is stored in the browser via `localStorage` (no backend required).

## Tech Stack

- React 19 + Vite
- React Router
- Tailwind CSS
- React Hook Form + Zod
- Sonner (toasts)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Demo Credentials

### Staff portal (`/staff/login`)

| Field    | Value            |
| -------- | ---------------- |
| Email    | `admin@zoo.com`  |
| Password | `admin123`       |

### Visitor accounts

Register at `/register`, then log in at `/login`.

## Features

### Public

- Browse animals with filters and detail pages
- Book tickets and complete demo payment
- Visitor registration, login, and profile with booking history
- Contact form with validation

### Staff

- Dashboard with stats and latest bookings
- Animal CRUD (add, edit, delete, search)
- Booking management (search, cancel, check-in, status filter)

## Project Structure

```
src/
  components/   # Reusable UI (animals, booking, common, navigation)
  data/         # Seed data (animals, tickets, staff)
  layouts/      # Public and dashboard layouts
  pages/        # Public and staff pages
  routes/       # Route definitions and guards
  utils/        # Storage, validators, helpers
```

## Storage Keys

| Key               | Purpose              |
| ----------------- | -------------------- |
| `zooAnimals`      | Animal records       |
| `zooBookings`     | Ticket bookings      |
| `zooVisitors`     | Registered visitors  |
| `zooLoggedInUser` | Visitor session      |
| `zooStaffSession` | Staff session        |
| `zooCheckoutDraft`| In-progress checkout |

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run lint`  | Run ESLint           |
| `npm run preview` | Preview production build |

## License

See [LICENSE](LICENSE).
