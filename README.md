Creative Upaay Dashboard

📌 Project Overview
This project is a React + Tailwind + Redux Toolkit implementation of the Creative Upaay dashboard UI.  
It matches the Figma tokens for typography, colors, and card styles, and includes features like task management, filters, drag & drop, and persistent state storage.


💻 Steps to Run Locally
1. Clone the repository:
   git clone https://github.com/ibrahim9492/Creative_Upaay_Assignment.git
   cd Creative-Upaay

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

🛠️ Technologies Used
- React.js – Component-based UI framework
- Redux Toolkit – State management with localStorage persistence
- Tailwind CSS – Utility-first CSS for styling
- react-beautiful-dnd – Drag & drop functionality for tasks
- Vercel – Deployment & hosting


⚠️ Known Limitations
- Drag & drop only works on desktop browsers (mobile touch support is limited).
- Current implementation persists state in localStorage, not a backend (so data is device-specific).
- No user authentication; all users share the same state if deployed without backend integration.
- Error handling and form validations (e.g., task creation) are minimal.

🌐 Live Demo
Creative Upaay Dashboard: https://creative-upaay-assignment-delta.vercel.app/

📂 GitHub Repository
GitHub Repo: https://github.com/ibrahim9492/Creative_Upaay_Assignment.git
