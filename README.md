# 📝 Taskify: Your Personal Task Manager

Welcome to **Taskify**! This is a full-stack Task Manager application built as part of a coding assignment. I wanted to create a smooth, intuitive experience for managing daily tasks while demonstrating a robust backend and a responsive frontend.

This project goes beyond the basics to include **JWT Authentication** for security and a complete **Docker** setup, so anyone can spin it up on their machine in seconds!

---

## 🏗️ What's Inside?

I built this application using a modern tech stack to ensure it's fast, secure, and easy to maintain:

- **Frontend:** Powered by **Angular** using standalone components and reactive forms. It features a clean drag-and-drop Kanban board!
- **Backend:** Built with **Spring Boot**, handling routing, business logic, and database operations securely via RESTful APIs.
- **Database:** **MySQL**, managed seamlessly under the hood using Spring Data JPA.
- **Security:** Fully protected API endpoints using **JWT (JSON Web Tokens)**. You'll need to create an account to view or edit tasks!
- **Documentation:** An automated **Swagger UI** interface to explore and test the API endpoints right from your browser.
- **Deployment:** Everything is containerized with **Docker** and orchestrated using `docker-compose`.

---

## 🚀 Getting Started

Want to run this project on your machine? You have two options!

### Option 1: The Docker Way (Recommended & Easiest) 🐳
If you have Docker installed, you don't even need Java or Node on your machine.
1. Open up your terminal in this repository's root folder.
2. Run this magic command:
   ```bash
   docker-compose up --build -d
   ```
3. That's it! 
   - Visit the App: 👉 **http://localhost:4200**
   - Check out the API: 👉 **http://localhost:8080/api**

### Option 2: The Manual Way (For developers) 💻
Prefer running things locally without Docker? You'll need Java 17, Node.js 20+, and MySQL.

**1. Database Server**
- Ensure your local MySQL is running on port `3306`.
- We expect the default credentials (`root` / `root`), but you can change this in `backend/src/main/resources/application.properties`. 
- The backend will automatically create the database schema for you!

**2. Boot up the Backend**
- Head into the `backend/` folder.
- Run it using the Maven wrapper: `./mvnw spring-boot:run`
- The API will start serving on port `8080`.

**3. Launch the Frontend**
- Jump over to the `frontend/` folder.
- Install the packages: `npm install`
- Start the server: `npm start`
- Go to `http://localhost:4200` in your browser.

---

## 🔐 How to Log In & Use the App

Because this app uses JWT Authentication to keep data secure, you can't just jump right in!
1. When you open the frontend, click on **Register** to create a fresh account.
2. Use those new credentials to **Log in**.
3. Now the app will grant you a token (saved securely in your browser), and you can start adding, dragging, editing, and completing tasks!

---

## 📸 Project Screenshots

Here's a quick look at the application in action:

<div align="center">
  <h3>Login & Registration</h3>
  <img src="assets/Screenshot 2026-03-20 151729.png" width="800" alt="Task Dashboard">
  <br><br>
  <img src="assets/Screenshot 2026-03-20 151748.png" width="800" alt="Task Interaction">

  <h3>Kanban Board & Task Management</h3>
  <img src="assets/Screenshot 2026-03-20 151659.png" width="800" alt="Login Page">
  <br><br>
  <img src="assets/Screenshot 2026-03-20 151714.png" width="800" alt="Registration Page">
  
</div>

---

## 📖 API Documentation (Swagger)

Curious about how the API responses look? I've bundled an automated documentation page for the backend!

Once the backend is up and running, just go to 👉 **[http://localhost:8080/api](http://localhost:8080/api)** 

*P.S. Since the API is protected, don't forget to grab your `Bearer` token after logging in and paste it into Swagger's "Authorize" section so you can test the endpoints manually!*
