
Chatbox
This repository contains a messaging chatbox application built using Node.js, Express, and Socket.io. The application allows users to sign up, log in, and chat in real-time. This README provides an overview of the project, its features, setup instructions, and more.

Table of Contents
Project Structure
Features
Technologies Used
Getting Started
Prerequisites
Installation
Running the Application
Contributing
License
Project Structure
The project directory contains the following structure:

bash
Copy code
chatbox/
├── controllers/
├── models/
├── routes/
│   ├── api/
│   ├── index.js
│   ├── user.js
├── views/
├── .env
├── .gitignore
├── index.js
├── package.json
├── README.md
Features
User authentication and authorization
Real-time messaging using Socket.io
OAuth authentication with Google
Password encryption with bcrypt
Flash messages for notifications
Session management with express-session
Responsive design with EJS templates
Technologies Used
Backend
Node.js
Express.js
MongoDB
Mongoose
Passport.js (local and Google OAuth strategies)
Socket.io
bcrypt for password hashing
jsonwebtoken for token generation
dotenv for environment variables
Frontend
EJS (Embedded JavaScript templates)
connect-flash for flash messages
noty for notifications
Getting Started
Prerequisites
Node.js (version 14.x or later)
npm (version 6.x or later)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Bijaykumaryadav/Chatbox.git
cd Chatbox
Install backend dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following environment variables:

bash
Copy code
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/users/auth/google/callback
Running the Application
Start the server:

bash
Copy code
npm start
The server will start on http://localhost:3000.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any features, improvements, or bug fixes.

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the ISC License. See the LICENSE file for details.

Author: Bijay Kumar Yadav

Contact
For any issues or questions, please open an issue on GitHub.







