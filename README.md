# TaskManager

TaskManager is a modern, intuitive task management web application built with React + Vite for the frontend and Node.js + Express + MySQL for the backend. It allows users to add, complete, delete, and track tasks with a clean UI and REST API integration.

---

## Features

- Add new tasks with validation (minimum 3 characters)
- Mark tasks as completed or pending
- Delete tasks
- Real-time task statistics (total, completed, success rate)
- Responsive and professional UI using plain CSS
- Backend REST API with Node.js, Express, and MySQL
- Persistent data storage with MySQL database

---

## Tech Stack

- Frontend: React, Vite, JSX, CSS
- Backend: Node.js, Express
- Database: MySQL
- API Testing: Postman or any REST client

---

## Folder Structure

TaskManager/
├── frontend/ # React + Vite app
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
└── backend/ # Node.js + Express API server
├── server.js
├── package.json


---

## Getting Started

### Prerequisites

- Node.js >= 14.x installed
- MySQL server running
- A MySQL database named `TaskManager` with a `tasks` table (see backend setup)
- Git (optional)
- Postman (for API testing, optional)

---

## Frontend Setup (React + Vite)

### 1. Navigate to frontend folder
cd TaskManager-Frontend

### 2. Install dependencies
npm install

### 3. Run development server
npm run dev


- Your React app will be running at `http://localhost:5173`
- Update backend API URLs in `src/App.jsx` to point to your backend server URL for full functionality

---

## Backend Setup (Node.js + Express + MySQL)

### 1. Navigate to backend folder
cd backend

### 2. Install dependencies
npm install

### 3. Setup MySQL Database
Run the following SQL commands to create database and table:

CREATE DATABASE TaskManager;
USE TaskManager;

CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
text VARCHAR(255) NOT NULL,
completed BOOLEAN DEFAULT FALSE
);

### 4. Update `server.js` with your MySQL credentials if needed
Example in `server.js`:

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'your_mysql_password',
database: 'TaskManager'
});


### 5. Start the server
node server.js

Server runs on `http://localhost:3000`

---

## Backend API Endpoints

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | `/tasks`           | List all tasks          |
| POST   | `/tasks`           | Create a new task       |
| PUT    | `/tasks/:id`       | Update task status      |
| DELETE | `/tasks/:id`       | Delete a task           |

---

## Testing APIs

- Use Postman or a similar client.
- Base URL: `http://localhost:3000`
- Test CRUD operations with the above endpoints.

---

## Full Frontend Code Snippets

### src/App.jsx

### src/App.css

### src/main.jsx


---

## Contribution and License

Feel free to fork, improve, or suggest features!

Licensed under MIT License.

---

If you want, I can create a GitHub repository structure with all files named for TaskManager ready to clone. Would you like that?







