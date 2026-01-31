# Law Firm Website

A modern, multilingual law firm website built with **Strapi CMS** (backend) and **Next.js** (frontend).

## Tech Stack

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| **Backend**        | Strapi 5.34 (Headless CMS)          |
| **Database**       | SQLite (development)                |
| **Frontend**       | Next.js 16, React 19                |
| **Styling**        | Tailwind CSS 4                      |
| **State**          | Redux Toolkit                       |
| **Forms**          | Formik + Yup                        |
| **i18n**           | i18next (English & Arabic)          |
| **UI Components**  | Swiper (carousels)                  |

## Project Structure

```
├── backend/                 # Strapi CMS
│   ├── config/              # Strapi configuration
│   ├── src/
│   │   ├── api/             # Content type APIs
│   │   │   ├── hero-slide/      # Homepage slider
│   │   │   ├── service/         # Legal services
│   │   │   ├── team-member/     # Attorney profiles
│   │   │   ├── testimonial/     # Client reviews
│   │   │   ├── subscriber/      # Newsletter signups
│   │   │   └── site-setting/    # Global settings
│   │   └── components/      # Reusable components
│   └── public/              # Static assets
│
├── frontend/                # Next.js application
│   ├── public/
│   │   └── locales/         # Translation files (en, ar)
│   └── src/
│       ├── app/             # App router pages
│       │   └── [lng]/       # Locale-based routing
│       ├── components/      # React components
│       ├── i18n/            # i18next configuration
│       ├── lib/api/         # Strapi API client
│       └── store/           # Redux store & slices
│
└── package.json             # Root scripts
```

## Prerequisites

- Node.js >= 20.0.0
- npm >= 6.0.0

## Getting Started

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Environment Setup

**Backend** (`backend/.env`):

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

> See `backend/.env.example` for a template.

**Frontend** (`frontend/.env.local`):

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 3. Run Development Servers

From the root directory:

```bash
# Start Strapi backend (runs on http://localhost:1337)
npm run dev:backend

# In a separate terminal, start Next.js frontend (runs on http://localhost:3000)
npm run dev:frontend
```

Or run them individually:

```bash
# Backend
cd backend && npm run develop

# Frontend
cd frontend && npm run dev
```

### 4. Access the Applications

- **Frontend**: http://localhost:3000
- **Strapi Admin Panel**: http://localhost:1337/admin

On first run, you'll be prompted to create a Strapi admin account.

## Content Types

| Content Type   | Description                                      |
| -------------- | ------------------------------------------------ |
| **Hero Slide** | Homepage slider items (image/video support)      |
| **Service**    | Legal services with rich text content            |
| **Team Member**| Attorney/staff profiles                          |
| **Testimonial**| Client reviews and feedback                      |
| **Subscriber** | Newsletter email subscriptions                   |
| **Site Setting**| Global config (logo, social links, headings)   |

All content types support **i18n localization** for English and Arabic.

## Available Scripts

### Root

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run dev:backend`  | Start Strapi in development    |
| `npm run dev:frontend` | Start Next.js in development   |
| `npm run build:backend`| Build Strapi for production    |
| `npm run build:frontend`| Build Next.js for production  |

### Backend

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run develop` | Start with auto-reload               |
| `npm run start`   | Start production server              |
| `npm run build`   | Build admin panel                    |
| `npm run strapi`  | Run Strapi CLI commands              |

### Frontend

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start development server               |
| `npm run build` | Build for production                   |
| `npm run start` | Start production server                |
| `npm run lint`  | Run ESLint                             |

## Internationalization

The site supports two languages:
- **English** (`en`) - Default
- **Arabic** (`ar`)

Translation files are located in `frontend/public/locales/`.

## License

Private project.
