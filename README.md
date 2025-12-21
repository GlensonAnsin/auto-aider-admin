# Auto AIDER Admin Dashboard

A comprehensive admin dashboard application for managing Auto AIDER services, built with React, TypeScript, and Vite. This application provides administrators with tools to approve repair shop accounts, manage car owners, view repair shops, and monitor system statistics.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Key Components](#key-components)
- [Services](#services)
- [Routing](#routing)
- [Authentication](#authentication)
- [Development](#development)

## 🎯 Overview

The Auto AIDER Admin Dashboard is a full-featured administrative interface designed to manage the Auto AIDER platform. Admins can approve/reject repair shop registrations, view comprehensive lists of car owners and repair shops, and access real-time analytics about platform activity including user registrations and daily scans.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: React Hooks
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.IO
- **Maps Integration**: Google Maps API
- **Date Handling**: Day.js
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/               # Reusable React components
│   ├── ProtectedRoute.tsx   # Route protection wrapper for authenticated pages
│   └── Sidebar.tsx          # Main navigation sidebar (mobile & desktop)
│
├── pages/                    # Page components
│   ├── auth/
│   │   └── Login.tsx        # Admin login page with credentials validation
│   │
│   └── dashboard/
│       ├── DashboardLayout.tsx    # Main dashboard layout wrapper
│       ├── Home.tsx               # Dashboard home with statistics and charts
│       ├── CarOwners.tsx          # List of registered car owners
│       ├── RepairShops.tsx        # List of approved repair shops
│       ├── AccountApproval.tsx    # List of pending repair shop approvals
│       └── ViewAccountApproval.tsx # Detailed view for shop approval/rejection
│
├── services/                 # API and external service integrations
│   ├── backendApi.ts       # All backend API endpoints
│   ├── interceptor.ts      # Axios interceptor for auth & token refresh
│   └── socket.ts           # WebSocket connection setup
│
├── router/
│   └── router.tsx          # React Router configuration
│
├── interfaces/             # TypeScript interfaces
│   ├── shop.ts            # AutoRepairShop interface
│   └── user.ts            # User interface
│
├── utils/                  # Utility functions
│   └── tokenStorage.ts    # Token management (localStorage)
│
├── assets/                 # Static assets (images, logos)
├── global.css             # Global styles and Tailwind config
└── main.tsx               # Application entry point
```

## ✨ Features

### Authentication
- Admin login with username and password
- JWT-based token authentication (Access & Refresh tokens)
- Automatic token refresh on 401 responses
- Session persistence using localStorage

### Dashboard Home
- Real-time admin information display
- Statistics cards showing:
  - Total car owners count
  - Total repair shops count
  - Daily scans count
  - Monthly registration trends
- Visual charts for car owners and repair shops registration growth
- Growth percentage indicators for current month
- Quick action buttons to navigate to main sections

### Account Approval
- Grid view of pending repair shop registrations
- Shop profile cards with images and details
- Search functionality across shop names and owner details
- Pagination with configurable items per page
- Detailed shop view with:
  - Shop information and ratings
  - Owner details
  - Google Maps location display
  - Documents and service offerings
  - Approve or reject functionality
  - Reject confirmation modal with optional notes

### Car Owners Management
- Searchable table of registered car owners
- Display of owner details (name, email, phone, registration date)
- Pagination controls
- Sort by registration date (newest first)
- Items per page customization

### Repair Shops Management
- Comprehensive list of approved repair shops
- Search and filter capabilities
- Display of owner and shop information
- Shop ratings and contact details
- Pagination and customizable view

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auto-aider-admin
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory with the following variables:
```env
VITE_BACKEND_API_URL="https://auto-aider-backend.onrender.com/api"
VITE_BACKEND_BASE_URL="https://auto-aider-backend.onrender.com"
VITE_GOOGLE_MAPS_API="<YOUR_GOOGLE_MAPS_API_KEY>"
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## ⚙️ Environment Configuration

Create a `.env` file in the project root with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_API_URL` | Backend API endpoint | `https://auto-aider-backend.onrender.com/api` |
| `VITE_BACKEND_BASE_URL` | Backend base URL for WebSocket | `https://auto-aider-backend.onrender.com` |
| `VITE_GOOGLE_MAPS_API` | Google Maps API key | `AIzaSy...` |

## 🧩 Key Components

### ProtectedRoute
Wrapper component that ensures only authenticated users can access dashboard pages. Redirects unauthenticated users to the login page.

```typescript
<ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>
```

### Sidebar
Navigation component with responsive design:
- **Desktop**: Fixed sidebar with full navigation menu
- **Mobile**: Collapsible hamburger menu
- Logout functionality
- Active route highlighting

### DashboardLayout
Main layout wrapper providing consistent navigation structure across all dashboard pages using `<Outlet />` for route rendering.

## 🌐 Services

### Backend API (backendApi.ts)

**Authentication**
- `loginAdmin(username, password)` - Authenticate admin user

**Admin Management**
- `getAdminInfo()` - Fetch current admin information

**Shop Management**
- `getAllUnAppShops()` - Get all unapproved shops
- `getUnAppShopInfo(shopID)` - Get details of a specific shop
- `updateApprovalStatus(shopID, decision)` - Approve or reject a shop
- `getAllShopsForAdmin()` - Get all approved repair shops

**User Management**
- `getAllUsers()` - Get all car owners

**Statistics**
- `countAllCO()` - Count total car owners
- `countAllRS()` - Count total repair shops
- `countScansToday()` - Count scans performed today
- `newlyRegisteredCO()` - Get monthly car owner registration data
- `newlyRegisteredRS()` - Get monthly repair shop registration data

### Axios Interceptor (interceptor.ts)

- Automatic Authorization header injection
- Token refresh on 401 responses
- Seamless retry of failed requests with new token
- Automatic logout on token expiration

### Socket.IO (socket.ts)

WebSocket connection for real-time updates from the backend server.

## 🗺️ Routing

The application uses React Router v7 with the following structure:

| Route | Component | Authentication | Description |
|-------|-----------|---|---|
| `/login` | Login | Public | Admin login page |
| `/` | Home | Protected | Dashboard home with statistics |
| `/car-owners` | CarOwners | Protected | Car owners list and management |
| `/repair-shops` | RepairShops | Protected | Approved repair shops list |
| `/account-approval` | AccountApproval | Protected | Pending shop approvals |
| `/account-approval/:shop_id` | ViewAccountApproval | Protected | Shop approval details |

Route loaders fetch required data before rendering pages.

## 🔐 Authentication

### Token Management
Tokens are stored in `localStorage`:
- `accessToken` - JWT for API requests (short-lived)
- `refreshToken` - Token for refreshing access token (long-lived)

### Token Refresh Flow
1. Request fails with 401 (Unauthorized)
2. Interceptor retrieves refresh token from storage
3. Calls refresh endpoint to get new access token
4. Retries original request with new token
5. If refresh fails, user is logged out

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- DaisyUI components for pre-built UI elements
- Responsive design using Tailwind breakpoints

### Component Patterns

- Functional components with hooks
- Custom hooks for reusable logic
- Memoization with `useMemo` for performance optimization
- Error boundaries and error handling in async operations
- Type-safe interfaces for all data structures

## 📝 Interfaces

### User Interface (user.ts)
Represents a car owner in the system with personal details, account settings, and status information.

### AutoRepairShop Interface (shop.ts)
Represents a repair shop with ownership, location, services, ratings, and approval status.

## 🚀 Deployment

The application is configured for deployment to platforms like Vercel or Netlify:

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure environment variables are set on the hosting platform

## 📦 Dependencies

Key dependencies are defined in `package.json`. Install all dependencies with:
```bash
npm install
```

## 🔗 Related Services

This admin dashboard communicates with:
- **Auto AIDER Backend API** - REST API for data operations
- **Google Maps API** - Location visualization
- **WebSocket Server** - Real-time updates via Socket.IO
