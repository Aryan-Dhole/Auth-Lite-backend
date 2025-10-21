# 🔐 AuthLite Backend

The **AuthLite Backend** is a lightweight Node.js + Express + MongoDB authentication API built with simplicity, security, and scalability in mind.  
It handles user registration, login, and protected routes using JWT authentication.

---

## 🚀 Tech Stack

- **Node.js** — server runtime  
- **Express.js** — backend framework  
- **MongoDB + Mongoose** — database + ODM  
- **JWT (jsonwebtoken)** — authentication  
- **bcryptjs** — password hashing  
- **dotenv** — environment variables  
- **Render** — deployment  

---

## 📁 Folder Structure
authlite-backend/
├── server.js # Entry point
├── routes/
│ └── authRoutes.js # Auth routes (register, login, profile)
├── models/
│ └── userModel.js # MongoDB schema
├── middleware/
│ └── authMiddleware.js # JWT verify middleware
├── .env # Environment variables
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

1. **Clone the repo**
   git clone https://github.com/yourusername/authlite-backend.git
   cd authlite-frontend

2. Install dependencies 

npm install

3. Add environment variables in .env

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. Run the server 
npm start

Server runs on http://localhost:5000


## 🧪 Test Flow

🧪 Test with Postman

Register a user → /api/auth/register
Login to get a token → /api/auth/login
Copy the token and use it in Authorization header:
Authorization: Bearer <token>


Access protected route → /api/auth/profile

## Deployment

Deployed on [Render →]( https://auth-lite-backend.onrender.com)

## Future Upgrades

Password reset flow
Role-based auth
MongoDB aggregation insights
Cloud logging + monitoring

## Author: Aryan Dhole
"Auth done right — simple, clean, and secure."
