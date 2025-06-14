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

---

## 📁 Folder Structure

task-manager/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ ├── TaskForm.js
│ │ ├── TaskList.js
│ │ ├── services/
│ │ │ └── taskService.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Express backend
│ ├── server.js
│ ├── tasks.json
│ └── package.json

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

✅ Design Decisions
- Used plain CSS instead of Tailwind or Bootstrap for minimalism and simplicity.
  
- Used manual input validation instead of external libraries for simplicity.

- Used JSON file for backend data storage instead of a real database to keep setup light.

- Separated client and server for better structure and scalability.

