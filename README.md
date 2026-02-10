# WordCraft-AI ✍️📰

**WordCraft-AI** is a **full-stack AI-powered blogging platform** built using the **MERN stack**, designed for creating, discovering, and engaging with blogs. It integrates **Gemini AI** to assist writers in drafting, editing, and generating blogs with control over **tone and style**, while supporting real world blogging features like drafts, tags, search, and threaded comments.

---

## 🧠 Features

### 👤 User Features

* Secure signup & login using **JWT authentication**
* Write and publish blogs using a clean editor
* Save blogs as **drafts** before publishing
* Browse and read blogs published by other users
* Search and filter blogs using **tags**
* Add comments on blogs
* Reply to comments, creating **threaded discussions**
* Choose the **tone** of the blog

---

### 🤖 AI-Powered Writing (Gemini AI)

* Edit or refine **specific sections** of a blog using AI
* Generate a **complete blog** using Gemini AI
* Tone-controlled AI output for consistent writing style

---

## 🔐 Authentication & Security

* JWT-based authentication for secure session management
* Protected routes for creating, drafting, and commenting
* User-specific access to drafts and authored blogs

---

## 🧱 Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB
* Mongoose ODM

### AI Integration

* Gemini AI for blog generation and editing

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Husainworks/WordCraft-AI.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_ACCESS_TOKEN=your_admin_access_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️ Run the Application

```bash
# Start backend server
npm run dev

# Start frontend
npm start
```

---

## 🧪 Blog & AI Flow

* User writes or drafts a blog
* Selects tone and AI action (edit / generate)
* Content generated via Gemini AI
* Blog is saved as draft or published
* Readers can comment and reply in threads
