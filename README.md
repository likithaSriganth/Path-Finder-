# 🧭 Career Compass AI

> AI-powered career path recommendation platform with explainable intelligence

Career Compass AI is a modern web application that helps users discover personalized career paths based on their skills and interests. Using explainable AI, it provides transparent recommendations with detailed roadmaps, skill gap analysis, and curated learning resources.

![Tech Stack](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)
![Express](https://img.shields.io/badge/Express-5.0-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06b6d4?logo=tailwindcss)

## ✨ Features

- 🔐 **Secure Authentication** - Session-based authentication with Passport.js
- 🤖 **AI Career Recommendations** - Personalized career paths with explainable reasoning
- 📊 **Match Score Analysis** - Intelligent matching based on your skills and experience
- 🎯 **Skill Gap Identification** - Clear insights into skills you need to develop
- 🗺️ **Career Roadmaps** - Step-by-step guidance with timelines and milestones
- 📚 **Learning Resources** - Curated courses, articles, and books for each path
- 🎨 **Modern UI** - Responsive glassmorphism design with smooth animations
- 🔒 **Protected Routes** - Role-based access control for authenticated features

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Routing**: Wouter 3.3.5
- **State Management**: TanStack Query 5.60.5
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: shadcn/ui (Radix UI based)
- **Animations**: Framer Motion 12.23.24
- **Form Handling**: React Hook Form 7.66.0
- **Validation**: Zod 3.25.76
- **Icons**: Lucide React 0.545.0
- **Build Tool**: Vite 7.1.9

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express 5.0.1
- **Authentication**: Passport.js with Local Strategy
- **Session Management**: express-session
- **Password Hashing**: bcryptjs
- **Database ORM**: Drizzle ORM 0.39.3
- **Database**: PostgreSQL 16 (currently using in-memory storage)

### Development Tools
- **TypeScript**: 5.6.3
- **Build**: esbuild 0.25.0, tsx 4.20.5
- **Database Tools**: drizzle-kit 0.31.4

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- **PostgreSQL 16** (optional - currently using in-memory storage for development)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/career-compass-ai.git
cd career-compass-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend + Backend**: http://localhost:3000

### 5. Create Your Account

1. Navigate to http://localhost:3000
2. Click "Get Started"
3. Fill in your username, password, and profile information
4. Start exploring your personalized career paths!

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | No* | In-memory storage |
| `SESSION_SECRET` | Secret key for session encryption | No** | Auto-generated (dev only) |
| `PORT` | Server port number | No | `3000` |
| `NODE_ENV` | Environment mode | No | `development` |

\* Currently using in-memory storage. For production, PostgreSQL is required.  
\** Default is insecure - set a strong secret for production.

### Example `.env` file:

```env
# Database (optional for development)
DATABASE_URL=postgresql://user:password@localhost:5432/career_compass

# Session (generate with: openssl rand -base64 32)
SESSION_SECRET=your-super-secret-key-here

# Server
PORT=3000
NODE_ENV=development
```

## 📁 Project Structure

```
Career-Compass-AI/
├── client/                    # Frontend React application
│   ├── public/               # Static assets (favicon, images)
│   └── src/
│       ├── components/       # React components
│       │   ├── layout.tsx    # Main layout with header/footer
│       │   └── ui/           # shadcn/ui components (50+)
│       ├── hooks/            # Custom React hooks
│       │   ├── use-auth.tsx  # Authentication context
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── lib/              # Utilities
│       │   ├── mock-ai.ts    # AI career path generator
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       ├── pages/            # Application pages
│       │   ├── landing.tsx   # Public landing page
│       │   ├── signin.tsx    # Sign in page
│       │   ├── signup.tsx    # Sign up with profile
│       │   ├── dashboard.tsx # AI recommendations
│       │   ├── profile.tsx   # User profile
│       │   └── not-found.tsx
│       ├── App.tsx           # Main app with routing
│       ├── main.tsx          # React entry point
│       └── index.css         # Global styles
│
├── server/                   # Backend Express API
│   ├── index.ts             # Express server setup
│   ├── routes.ts            # API route handlers
│   ├── storage.ts           # Data storage layer
│   ├── static.ts            # Static file serving
│   └── vite.ts              # Vite dev integration
│
├── shared/                  # Shared code (client + server)
│   └── schema.ts            # Database schema & validation
│
├── script/                  # Build scripts
│   └── build.ts             # Production build script
│
├── components.json          # shadcn/ui configuration
├── drizzle.config.ts        # Database ORM config
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite bundler config
└── README.md                # This file
```

### Key Directories Explained

- **`client/`** - All frontend code, built with Vite
- **`server/`** - Express backend with authentication & API
- **`shared/`** - Code shared between client and server (types, schemas)
- **`script/`** - Custom build scripts for production

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (backend + frontend) |
| `npm run dev:client` | Start frontend dev server only (port 5000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema to PostgreSQL |

### Development Workflow

**Option 1: Full Stack Development (Recommended)**
```bash
npm run dev
```
This starts both backend and frontend. Access at http://localhost:3000

**Option 2: Frontend Only**
```bash
npm run dev:client
```
Frontend only at http://localhost:5000 (requires backend running separately)

## 🔑 API Documentation

### Authentication Endpoints

All authentication endpoints are prefixed with `/api/auth`:

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123",
  "name": "John Doe",
  "experience": "mid",
  "skills": "JavaScript, React, Node.js"
}
```

**Response**: `201 Created`
```json
{
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "name": "John Doe",
    "experience": "mid",
    "skills": "JavaScript, React, Node.js"
  }
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response**: `200 OK`
```json
{
  "message": "Signed in successfully",
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "name": "John Doe",
    "experience": "mid",
    "skills": "JavaScript, React, Node.js"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
```

**Response**: `200 OK` if authenticated, `401 Unauthorized` if not

#### Sign Out
```http
POST /api/auth/signout
```

**Response**: `200 OK`

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated user ID |
| `username` | TEXT | UNIQUE, NOT NULL | Unique username |
| `password` | TEXT | NOT NULL | Hashed password (bcrypt) |
| `name` | TEXT | NOT NULL | User's full name |
| `experience` | TEXT | NOT NULL | Experience level |
| `skills` | TEXT | NOT NULL | Comma-separated skills |

### Current Storage

**Development**: In-memory storage (MemStorage class)
- Data persists only while server is running
- Lost on server restart
- Perfect for development and testing

**Production**: PostgreSQL (migration required)
- Persistent data storage
- See [Deployment](#deployment) section for setup

### Running Migrations

```bash
# Push schema to database
npm run db:push

# Generate migration files (when schema changes)
npx drizzle-kit generate
```

## 🏗️ Architecture Overview

### Authentication Flow

```
1. User submits signup/signin form
2. Frontend sends credentials to /api/auth/signup or /api/auth/signin
3. Backend validates credentials (Passport.js)
4. Password hashed with bcrypt (signup) or compared (signin)
5. Session created and stored (express-session)
6. Session cookie sent to client (httpOnly, secure)
7. Client includes cookie in subsequent requests
8. Backend validates session for protected routes
```

### Route Protection

- **Public Routes**: `/`, `/signin`, `/signup`
- **Protected Routes**: `/dashboard`, `/profile`
- Protected routes use `ProtectedRoute` wrapper component
- Redirects to `/signin` if not authenticated
- Uses React Context (`useAuth`) for global auth state

### Path Aliases

TypeScript path aliases are configured for cleaner imports:

```typescript
import { Button } from "@/components/ui/button";  // → client/src/components/ui/button
import { User } from "@shared/schema";            // → shared/schema
```

## 🏭 Building for Production

### Build Process

```bash
npm run build
```

This creates:
- **Client**: `dist/public/` - Static files served by CDN
- **Server**: `dist/index.cjs` - Bundled Express server

### Start Production Server

```bash
npm start
# Or
NODE_ENV=production node dist/index.cjs
```

### Production Requirements

1. **PostgreSQL Database**: In-memory storage won't work in production
2. **Session Secret**: Set strong `SESSION_SECRET` environment variable
3. **HTTPS**: Required for secure session cookies
4. **Environment Variables**: All production values must be set

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. **Set up PostgreSQL database** (Vercel Postgres, Neon, or Supabase)

2. **Install Vercel CLI**:
```bash
npm i -g vercel
```

3. **Deploy**:
```bash
vercel
```

4. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Generate with `openssl rand -base64 32`
   - `NODE_ENV=production`

5. **Important**: Currently uses in-memory storage. Before deploying:
   - Update `server/storage.ts` to use PostgreSQL
   - Replace `memorystore` with `connect-pg-simple` for sessions
   - See deployment guide for detailed steps

### Other Deployment Options

- **Railway**: One-click deployment with PostgreSQL
- **Render**: Free tier available
- **Heroku**: Classic PaaS option
- **DigitalOcean App Platform**: Managed containers

### Session Storage Considerations

⚠️ **Important**: The current `memorystore` session storage won't work in serverless/multi-instance environments. For production:

- Use `connect-pg-simple` (PostgreSQL-backed sessions)
- Or implement Redis-based sessions
- Or consider JWT authentication for stateless sessions

## 🧪 Development Tips

### Adding a New Page

1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/layout.tsx`

### Adding UI Components

Using shadcn/ui:
```bash
npx shadcn-ui@latest add [component-name]
```

### TypeScript Type Checking

```bash
npm run check
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Sessions Not Persisting

- **Development**: This is normal with in-memory storage (lost on restart)
- **Solution**: Clear browser cookies and sign in again
- **Production**: Use PostgreSQL-backed sessions

### Database Connection Errors

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify DATABASE_URL format
DATABASE_URL=postgresql://username:password@host:port/database
```

### TypeScript Errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run check
```

### Build Failures

```bash
# Clear dist folder
rm -rf dist

# Rebuild
npm run build
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable/function names
- Add comments for complex logic
- Ensure `npm run check` passes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful accessible components
- **Icons**: [Lucide](https://lucide.dev/) - Clean icon library
- **Authentication**: [Passport.js](http://www.passportjs.org/) - Simple authentication
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript-first SQL toolkit
- **Design Inspiration**: Modern glassmorphism trend

## 📞 Support

For questions or issues:
- Open an [issue](https://github.com/yourusername/career-compass-ai/issues)
- Check existing [documentation](https://github.com/yourusername/career-compass-ai/wiki)

---

**Made with ❤️ by developers, for developers**
