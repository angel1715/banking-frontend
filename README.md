# 💳 Banking App (Frontend)

A modern and responsive frontend for a banking application, built with Next.js and Tailwind CSS.

## 🚀 Features

- User authentication (Login & Register)
- Protected routes
- Dashboard with account balance
- Deposit, Withdraw, and Transfer UI
- Transaction history visualization
- Responsive and clean UI design
- Auto redirect based on authentication

## 🛠️ Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Axios

## 📦 Installation

```bash
git clone https://github.com/angel1715/banking-frontend.git
cd banking-frontend
npm install
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=https://banking-api-dydj.onrender.com/api
```

## ▶️ Run the App

```bash
npm run dev
```

## 🌐 Live Demo

https://your-frontend.vercel.app

## 📱 Pages

- `/` → Landing page
- `/login`
- `/register`
- `/dashboard`
- `/transactions`

## 🔐 Authentication Flow

- User logs in and receives a JWT token
- Token is stored in localStorage
- Protected routes validate token before access

## 🎯 Highlights

- Clean UI inspired by fintech apps
- Real-time updates after transactions
- Secure communication with backend API

## 👨‍💻 Author

Angel Garcia
