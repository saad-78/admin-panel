# Full-Stack Authentication App

A production-ready authentication system with role-based access control, built with Next.js 15, Express, PostgreSQL (Neon), and Prisma.

## 🚀 Features

- ✅ JWT Authentication
- ✅ Role-based authorization (User/Admin)
- ✅ CRUD operations for items
- ✅ Search & pagination
- ✅ Form validation with Zod
- ✅ Different UI for Admin vs User
- ✅ Protected routes
- ✅ Responsive design with Tailwind CSS

## 🛠 Tech Stack

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- Prisma ORM
- JWT + Bcrypt
- CORS enabled

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn/ui
- React Hook Form + Zod
- Axios

## 📦 Project Structure

fullstack-auth-app/
├── backend/ # Express API server
├── frontend/ # Next.js frontend
├── package.json # Root package.json for scripts
└── README.md



## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon account (free tier)

### Installation

1. Clone the repository:
git clone <your-repo-url>
cd fullstack-auth-app



2. Install dependencies:
npm run install:all



3. Setup environment variables:

**Backend** (`backend/.env`):
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development



**Frontend** (`frontend/.env.local`):
NEXT_PUBLIC_API_URL=http://localhost:5000



4. Run database migrations:
cd backend
npx prisma migrate dev
cd ..



5. Start development servers:
npm run dev



This will start:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Items (Protected)
- `GET /items` - Get all items (with search & pagination)
- `GET /items/:id` - Get single item
- `POST /items` - Create item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

### Admin (Protected)
- `GET /items/admin/users` - Get all users with item counts

## 🔒 User Roles

### User
- Can create, read, update, delete their own items
- Can view their dashboard
- Cannot see other users' items

### Admin
- Can see all users' items
- Can view admin dashboard with user statistics
- Can manage any item

## 🧪 Testing the App

1. Create a user account (signup as USER)
2. Create some items
3. Test search and pagination
4. Create an admin account (signup as ADMIN)
5. See all users' items in admin dashboard

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository (select `backend` folder)
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

## 📝 Environment Variables

See `.env.example` files in both `backend/` and `frontend/` directories.

## 🤝 Contributing

Pull requests are welcome!

## 📄 License

MIT

## 👨‍💻 Author

Your Name
Step 9: Create .env.example Files
File: backend/.env.example:


DATABASE_URL="postgresql://user:password@host-pooler.region.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@host.region.aws.neon.tech/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
PORT=5000
NODE_ENV=development
File: frontend/.env.example:


NEXT_PUBLIC_API_URL=http://localhost:5000