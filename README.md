✅ Task Manager Web App
A simple full-stack Task Manager web application built using React for the frontend and Node.js with Express for the backend. It allows users to add, complete, and delete tasks.

🔧 Technologies Used
Frontend (React)
1) React (via Create React App)
2) Plain CSS

Backend (Node.js)
1) Express
2) JSON as a mock database (tasks.json)

📁 Folder Structure
task-manager/
│
├── client/           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   └── index.js
│   └── package.json
│
├── server/           # Express backend
│   ├── server.js
│   ├── tasks.json
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

Visit http://localhost:3000 in your browser.

⚙️ Features
1) Add a task

2) Mark task as complete/incomplete

3) Delete a task

4) Simple UI with mobile-friendly layout

✅ Design Decisions
- Used plain CSS instead of Tailwind or Bootstrap for minimalism and simplicity.

- Used JSON file for backend data storage instead of a real database to keep setup light.

- Separated client and server for better structure and scalability.

