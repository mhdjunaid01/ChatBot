Sure! Here’s a clean, **single-README** you can drop in the root of your project (no folder tree included).
It briefly explains the MERN chatbot app, setup instructions, and environment variables.

---

## ChatBot – MERN Stack (Vite + Tailwind v4)

An AI-powered chatbot built with **MongoDB, Express, React (Vite)**, and **Node.js**, styled using Tailwind CSS v4.

---

### 🚀 Features

* User authentication (JWT + bcrypt)
* Protected API routes
* Real-time AI replies using **Google Gemini API**
* Secure configuration with **dotenv**
* Modern frontend stack: React 19, Tailwind 4, Framer Motion animations

---

### 🛠️ Prerequisites

* **Node.js ≥18** and **npm or pnpm**
* A running **MongoDB Atlas** cluster
* A **Google Gemini API** key

---

### ⚙️ Environment Variables

Create a `.env` file in the backend folder with:

```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<strong-random-secret>
GEMINI_API_KEY=<your-gemini-api-key>
NODE_ENV=development
CLIENT_URL=http://localhost:5173/
```

> ⚠️ Never commit real credentials (the example values above are placeholders).

---

### 🧩 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/mhdjunaid01/ChatBot.git
   cd ChatBot
   ```

2. **Backend**

   ```bash
   cd backend
   npm install
   npm run dev   # starts nodemon on http://localhost:5000
   ```

3. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev   # starts Vite dev server on http://localhost:5173
   ```

---

### 🗂️ Scripts

**Backend**

* `npm run dev` – start in dev mode with nodemon
* `npm start` – production start

**Frontend**

* `npm run dev` – Vite dev server
* `npm run build` – production build
* `npm run preview` – preview the build

--
