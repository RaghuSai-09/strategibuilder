# Authentication System Implementation Guide

This document provides an overview of the authentication system structure and how to implement the full functionality.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Auth pages with shared layout
│   │   ├── layout.tsx            # Auth layout (gradient background)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Registration page
│   ├── (protected)/               # Protected pages requiring auth
│   │   ├── layout.tsx            # Protected layout
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard page
│   │   └── profile/
│   │       └── page.tsx          # User profile page
│   └── api/
│       └── auth/                  # Authentication API endpoints
│           ├── login/
│           │   └── route.ts      # POST /api/auth/login
│           ├── register/
│           │   └── route.ts      # POST /api/auth/register
│           ├── profile/
│           │   └── route.ts      # GET/PUT /api/auth/profile
│           └── logout/
│               └── route.ts      # POST /api/auth/logout
├── context/
│   └── AuthContext.tsx            # Auth state management
├── types/
│   └── auth.ts                    # TypeScript type definitions
└── middleware.ts                  # Route protection middleware
```

## 🔐 Routes Overview

### Public Routes
- `/` - Home page
- `/who-we-are` - About page
- All routes accessible without authentication

### Auth Routes (Redirect if authenticated)
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require authentication)
- `/profile` - User profile management
- `/dashboard` - Main dashboard

## 🛠️ Implementation Steps

### 1. Database Setup
You'll need to implement a database to store user data. Recommended options:
- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **Supabase** (PostgreSQL + Auth)
- **Firebase**

#### Example Prisma Schema:
```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // Store hashed passwords only
  avatar    String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. Password Hashing
Install bcrypt for password hashing:
```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

Example usage:
```typescript
import bcrypt from 'bcryptjs';

// Hash password on registration
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password on login
const isValid = await bcrypt.compare(password, user.password);
```

### 3. JWT Token Implementation
Install JWT library:
```bash
npm install jsonwebtoken
npm install -D @types/jsonwebtoken
```

Create a utility for token generation:
```typescript
// src/lib/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

### 4. Environment Variables
Create a `.env.local` file:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="development"
```

### 5. Update API Routes

Replace the mock implementations in the API routes with actual database queries:

**Login Route** (`src/app/api/auth/login/route.ts`):
```typescript
// Query user from database
const user = await prisma.user.findUnique({ where: { email } });

// Verify password
const isValid = await bcrypt.compare(password, user.password);

// Generate JWT
const token = generateToken(user.id);
```

**Register Route** (`src/app/api/auth/register/route.ts`):
```typescript
// Check if user exists
const existingUser = await prisma.user.findUnique({ where: { email } });

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Create user
const user = await prisma.user.create({
  data: { name, email, password: hashedPassword }
});
```

### 6. Update AuthContext

The AuthContext is already set up to work with the API routes. It handles:
- Login state management
- Token storage (localStorage)
- Automatic auth check on mount
- Login/logout/register functions

### 7. Middleware Configuration

The middleware is configured to:
- Protect `/profile` and `/dashboard` routes
- Redirect unauthenticated users to `/login`
- Redirect authenticated users away from `/login` and `/register`

## 🔧 Additional Features to Implement

### 1. Email Verification
Add email verification on registration:
```typescript
// Generate verification token
const verificationToken = generateToken(user.id);

// Send verification email
await sendVerificationEmail(user.email, verificationToken);
```

### 2. Password Reset
Create routes for password reset:
- `/forgot-password` - Request password reset
- `/reset-password/[token]` - Reset password with token
- API routes: `/api/auth/forgot-password` and `/api/auth/reset-password`

### 3. OAuth Providers
Integrate social login:
```bash
npm install next-auth
```

Configure providers (Google, GitHub, etc.) in NextAuth.

### 4. Session Management
Consider using next-auth or implement custom session management:
- Refresh tokens for extended sessions
- Session expiry and renewal
- Multiple device management

### 5. Role-Based Access Control (RBAC)
Extend the middleware to handle roles:
```typescript
// Check user role
if (requiresAdmin && user.role !== 'admin') {
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}
```

## 📱 Testing the Flow

### Test Credentials (Mock Data)
- Email: `demo@example.com`
- Password: `password123`

### Flow Steps:
1. Visit `/register` to create an account
2. After successful registration, redirect to `/profile`
3. Visit `/dashboard` to see the dashboard
4. Click "Logout" to log out
5. Try accessing `/profile` - should redirect to `/login`
6. Log in again with credentials

## 🔒 Security Best Practices

1. **Never store plain passwords** - Always hash with bcrypt
2. **Use HTTPS in production** - Set `secure: true` on cookies
3. **Validate all inputs** - Server-side validation is essential
4. **Rate limiting** - Prevent brute force attacks
5. **CSRF protection** - Use tokens for state-changing operations
6. **Strong JWT secrets** - Use long, random secrets
7. **Short token expiry** - Use refresh tokens for long sessions
8. **SQL injection prevention** - Use parameterized queries/ORM

## 📚 Recommended Packages

```bash
# Database & ORM
npm install prisma @prisma/client
npm install -D prisma

# Authentication
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Validation
npm install zod

# Email
npm install nodemailer
npm install -D @types/nodemailer

# Rate limiting
npm install rate-limiter-flexible
```

## 🎨 UI Enhancements

Consider adding:
- Loading states
- Form validation feedback
- Success/error toast notifications
- Password strength indicator
- "Show password" toggle
- Social login buttons
- Avatar upload functionality

## 🚀 Deployment Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add error logging (Sentry, LogRocket)
- [ ] Configure email service (SendGrid, AWS SES)
- [ ] Test all auth flows
- [ ] Set up monitoring

## 📖 Next Steps

1. Choose and set up a database
2. Implement password hashing
3. Set up JWT token generation/verification
4. Replace mock API implementations with real database queries
5. Add email verification
6. Implement password reset
7. Add comprehensive error handling
8. Implement rate limiting
9. Add unit and integration tests
10. Deploy to production

---

For questions or issues, refer to the Next.js documentation:
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
