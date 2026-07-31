# 🛍️ Velora – Full Stack MERN E-Commerce Platform

Velora is a modern full-stack MERN e-commerce application built with industry-standard technologies. It provides a seamless online shopping experience with secure authentication, product management, shopping cart, online payments, and cloud-based image storage.

🔗 **Live Demo:** https://velora-pnwh.onrender.com

---

## 🚀 Features

- 🔐 Secure JWT Authentication
- 👥 Role-Based Access Control (Admin & Customer)
- 🛒 Shopping Cart Management
- 📦 Product Catalog & Categories
- 📝 Product CRUD Operations (Admin)
- 💳 Razorpay Payment Gateway Integration
- ☁️ Cloudinary Image Upload & Management
- 📊 Admin Dashboard & Analytics
- 🔍 Product Search & Filtering
- ⚡ Redux Toolkit State Management
- 📱 Fully Responsive Design
- 🌐 Single-Service Production Deployment on Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Cloudinary
- Razorpay

### Deployment
- Render
- MongoDB Atlas

---

## 📂 Project Structure

```text
Velora
│
├── frontend
│   ├── src
│   ├── public
│   └── dist
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── utils
│
└── package.json
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/rahuljoshi-18/Velora.git
```

```bash
cd Velora
```

### Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Configure Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

RAZORPAY_KEY_ID=YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

> Add application screenshots here.

Example:

- Home Page
- Product Page
- Cart
- Checkout
- Admin Dashboard

---

## 🌍 Live Demo

https://velora-pnwh.onrender.com

---

## 📁 GitHub Repository

https://github.com/rahuljoshi-18/Velora

---

## 👨‍💻 Author

**Rahul Joshi**

GitHub: https://github.com/rahuljoshi-18

LinkedIn: *(Add your LinkedIn profile here)*

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
