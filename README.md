# E-Commerce Full Stack Application

## Frontend

Modern and responsive **React frontend** for the E-Commerce platform.

## 📖 Project Overview

This repository contains the **frontend** part of a complete full-stack e-commerce application. It consumes REST APIs provided by the backend service and delivers a clean, responsive shopping experience.

**Backend Repository:**
[https://github.com/lensen-degife/ecommerce-backend](https://github.com/lensen-degife/ecommerce-backend)

---

## ✨ Features

* Product browsing and search
* Product details page
* Add and update products
* Shopping cart with modal support
* Responsive UI design
* Clean and user-friendly interface
* API integration with backend services

---

## 🛠️ Tech Stack

* React 18
* JavaScript (JSX)
* Axios
* CSS
* React Router

---

## 🚀 Running the Full Stack Application

### Prerequisites

Ensure the backend application is running:

```text
http://localhost:8080
```

### Step 1: Clone both repositories

```bash
git clone https://github.com/lensen-degife/ecommerce-backend.git
git clone https://github.com/lensen-degife/ecommerce-frontend.git
```

### Step 2: Install dependencies

```bash
cd ecommerce-frontend
npm install
```

### Step 3: Configure backend URL

Open:

```text
src/config.js
```

Make sure the API base URL is configured correctly:

```javascript
export const API_BASE_URL = 'http://localhost:8080';
```

### Step 4: Start the frontend

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

> Note: Start the backend before launching the frontend.

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable components
│   ├── ProductCard
│   └── CartModal
├── pages/            # Main application pages
│   ├── Home
│   └── ProductDetails
├── config.js         # API configuration
├── App.js
└── index.js
```

---

## 🔗 Related Repository

* Backend: [https://github.com/lensen-degife/ecommerce-backend](https://github.com/lensen-degife/ecommerce-backend)

---

## 🚀 Future Enhancements

* User authentication (Login/Register)
* Checkout and payment integration
* Order history
* Admin dashboard
* Dark mode support
* Product reviews and ratings

---

## 🤝 Contributing

Contributions and improvements are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

