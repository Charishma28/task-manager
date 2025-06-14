# ✅ Task Manager Web App

A simple full-stack Task Manager web application built using React for the frontend and Node.js with Express for the backend. It allows users to add, complete, and delete tasks.

---

## 🔧 Technologies Used

### 🔹 Frontend (React)
- React (via Create React App)
- Axios (for API requests)
- Plain CSS

### 🔹 Backend (Node.js + Express)
- Express
- CORS
- body-parser
- JSON as a mock database (`tasks.json`)
- Manual input validation using `if` conditions (no Joi)
- Singleton class (TaskManager) to manage task operations safely and modularly

---

## 📁 Folder Structure

task-manager/
│
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   └── index.js
│   └── package.json
│
├── server/               # Express backend
│   ├── server.js         # Main server file (uses TaskManager)
│   ├── taskManager.js    # Singleton class for managing tasks
│   ├── tasks.json        # JSON file acting as a mock DB
│   └── package.json


🚀 Getting Started
1. Clone the repository
git clone https://github.com/Charishma28/task-manager.git
cd task-manager

2. Install dependencies

For frontend
- cd client
- npm install

For backend
- cd ../server
- npm install
  
3. Run the application
Start backend server
- node server.js

Start frontend app (in a new terminal)
- cd client
- npm start

Open http://localhost:3000 in your browser.

⚙️ Features
1) Add a new task

2) Mark a task as complete/incomplete

3) Delete a task

4) Responsive and mobile-friendly layout

5) RESTful API with proper error codes

6) Server-side validation for inputs

7) Error handling for file operations

8) Loading states and button disable feedback
   
9) ✅ Singleton class to manage task logic in backend

✅ Design Decisions
- Plain CSS used instead of a UI framework for simplicity and clarity.

- JSON file used for persistence to avoid the overhead of setting up a full database for a simple demo.

- Separation of Concerns: Task logic moved into taskManager.js for better modularity.

- Singleton Pattern used for safe, centralized task management and future scalability.

- Loading states and disabled buttons implemented on frontend for improved user experience.

- Basic input validation and appropriate HTTP status codes (400, 404, 500) included in backend.
