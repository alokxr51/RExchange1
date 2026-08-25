# RExchange

> A secure, student-focused campus marketplace for buying, selling, exchanging, and giving away items within a college community.

RExchange is a React-based student marketplace designed to make campus-to-campus exchanges simple, safe, and convenient. Students can discover listings, connect with other students, manage their profiles, and exchange academic or everyday items.

## ✨ Features

### 🔐 Authentication & Security
- Student registration and login using Supabase Authentication
- Academic email verification
- Supports configurable academic domains:
  - `.edu`
  - `.ac.in`
  - `.edu.in`
  - `.ac.uk`
- Password reset and password update functionality
- Protected routes for authenticated users
- Persistent authentication sessions
- Row Level Security (RLS) using Supabase
- Private academic email information
- Profile privacy protections

### 🛍️ Student Marketplace
RExchange supports multiple listing types:

- 🏷️ Sell
- 🔄 Exchange
- 🎁 Free Giveaway
- 🛠️ Skills & Services

Marketplace functionality includes:
- Listing categories
- INR (₹) price formatting
- Search and filtering
- Saved listings
- Student seller profiles
- Listing images
- Listing status badges

### 👤 Student Profiles
- Student profile pages
- Verified campus information
- Profile editing
- Student avatar support
- Academic credentials
- Privacy-preserving public profiles

### 💬 Messaging
- Student-to-student conversations
- Chat interface
- Message history
- Conversation management

### 🤖 AI Assistant
RExchange includes an AI assistant architecture designed with provider abstraction, allowing AI providers to be changed without rewriting the application.

The initial implementation is designed around:
- Intent parsing
- Inline listing results
- Conversation history
- Provider-agnostic AI architecture

### 🎨 UI & Design
- Responsive React interface
- Dark mode support
- Student-focused design system
- Accessible reusable UI components
- Responsive desktop and mobile navigation
- Toast notifications
- Loading states
- Error boundaries
- Accessible forms and inputs

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework |
| Vite | Development & build tool |
| JavaScript | Application language |
| Tailwind CSS v4 | Styling |
| Supabase | Authentication & database |
| PostgreSQL | Database |
| Supabase Storage | Image storage |
| Zod | Form validation |
| Vitest | Testing |
| Vercel | Deployment |

## 📁 Project Structure

```text
RExchange/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── listings/
│   │   └── ui/
│   │
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── __tests__/
│   ├── App.jsx
│   └── index.css
│
├── supabase/
│   ├── migrations/
│   ├── storage_policies.sql
│   └── seed.sql
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
