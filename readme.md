# 🚀 Smart Attendance System  
### Secure • Real-Time • QR-Based • Location-Aware

A full-stack attendance management platform designed to eliminate proxy attendance using **secure session validation, QR authentication, and optional geo-fencing**.

This is a production-style project built with real-world architecture principles.

---

# 📌 Problem Statement

Traditional attendance systems suffer from:

- ❌ Proxy attendance
- ❌ Manual errors
- ❌ Time-consuming roll calls
- ❌ Expensive hardware dependency
- ❌ No real-time validation

Smart Attendance replaces hardware systems with a secure, scalable software-based solution.

---

# 💡 Solution Overview

Smart Attendance ensures:

- ✅ Attendance can only be marked during an **active session**
- ✅ Sessions automatically expire (backend enforced)
- ✅ Optional **50m location validation**
- ✅ Role-based secure access control
- ✅ Real-time attendance monitoring
- ✅ Clean Android + Web integration

---

# 🏗 System Architecture

Admin Panel (Web)
│
Teacher Dashboard (Web)  ──────►  Node.js API  ──────► MongoDB
│                           │
Student Android App        JWT + Role Middleware

---

# 🔐 Role-Based Access Control

| Role      | Capabilities |
|-----------|-------------|
| Admin     | Create teachers, assign subjects |
| Teacher   | Start session, generate QR, view live attendance |
| Student   | Scan QR, mark attendance, view summary |

Security is enforced:
- JWT authentication
- Role-based middleware
- Frontend route guards
- Backend validation

---

# ✨ Core Features

## 🔑 Secure Authentication
- JWT-based login
- Role validation (admin / teacher / student)
- Protected API routes

## ⏱ Time-Limited Sessions
- Default expiry: 3 minutes
- Expiration validated server-side
- Prevents replay or late attendance

## 📱 QR-Based Attendance
- Unique session QR
- Students scan via Android app
- Linked to sessionId

## 📍 Optional Geo-Fencing
- Teacher can enable location validation
- Students must be within 50 meters
- GPS distance calculation
- Optional per session

## 🔄 Live Attendance Feed
- Teacher sees names appear in real-time
- Helps detect missed scans immediately

## 📊 Attendance Dashboard
- Subject-wise summary
- Percentage calculation
- Mobile-friendly UI

---

# 🛠 Tech Stack

## 🌐 Web Frontend
- HTML5
- Modern CSS (animations + responsive layout)
- Vanilla JavaScript

## 📱 Android App
- Kotlin
- Jetpack Compose
- Retrofit (API integration)

## 🖥 Backend
- Node.js
- Express.js
- JWT Authentication
- Middleware-based role control

## 🗄 Database
- MongoDB
- Mongoose ODM

## 🚀 Deployment
- Backend: Render
- Frontend: Vercel

---

# 🔄 Application Flow

### 👨‍💼 Admin Flow
1. Login
2. Create teacher
3. Assign subjects

### 👨‍🏫 Teacher Flow
1. Login
2. Select subject
3. Start session
4. QR generated
5. View live attendance

### 👨‍🎓 Student Flow
1. Login (Android app)
2. Scan QR
3. Attendance validated
4. View attendance summary

---

# 🔒 Security Highlights

- Direct URL bypass prevented
- Backend session expiry validation
- Duplicate attendance prevention
- Role-based access middleware
- Optional location spoof prevention

---

# 📊 Database Models

### User
- name
- email
- password (hashed)
- role
- student details (USN, branch, semester)

### Session
- subject
- teacherId
- startTime
- expiresAt
- locationRequired
- teacherLocation

### Attendance
- studentId
- sessionId
- subject
- timestamp

---

# 🧠 Engineering Decisions

- Backend-driven session expiration
- QR tied to sessionId
- Attendance linked to sessionId
- Optional geolocation validation
- No hardware dependency

---

# 🚀 Future Improvements

- WebSockets for real-time updates
- Push notifications
- Institutional analytics dashboard
- Docker-based deployment
- AWS/GCP migration

---

# 📈 Why This Project Stands Out

This project demonstrates:

- Full-stack architecture design
- Secure API development
- Android + Web integration
- Role-based authentication systems
- Real-world feature planning
- Production deployment mindset

---

# 👨‍💻 Author

**Bharath S Marambeed**  
B.Tech CSE (3rd Year)  
Full-Stack & Android Developer  

GitHub: https://github.com/Bharath5551  
LinkedIn: https://www.linkedin.com/in/bharathmarambeed  

---

# ⭐ Recruiter Note

This project reflects:
- End-to-end system design
- Secure backend architecture
- Real-world problem solving
- Scalable feature planning
- Clean UI/UX implementation
