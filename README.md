# TeknoKonek

TeknoKonek is a full-stack social media application built with the MERN (MongoDB, Express.js, React, Node.js) stack, designed exclusively for students and faculties of CIT-U (Cebu Institute of Technology-University). It provides a platform for users to connect, share updates, and interact in a secure and engaging environment.

## Features

### 🔐 User Authentication & Authorization

- **Secure Login:** Users can securely log in to their accounts.
- **User Registration/Sign Up:** A streamlined process for new users to create accounts.
- **Password Visibility Toggle:** Option to show/hide entered passwords for convenience.
- **JWT-based Authentication:** Secure user sessions using JSON Web Tokens.

### 👤 User Profiles

- **Personalized Profiles:** Showcase user profile information, including profile and cover pictures.
- **Profile Customization:** Users can update personal details such as First Name, Last Name, Course & Year, Residence, Birth Country, and Relationship Status.
- **Follow/Unfollow System:** Interact with other users by following and unfollowing.
- **Follower/Following Count:** Display the number of followers and users being followed.
- **Personal Post Timeline:** View a dedicated timeline of only personal posts on the profile page.
- **Logout Functionality:** Securely log out from the application.

### 📝 Posts & Interactions

- **Diverse Post Creation:**
  - Create text-based posts.
  - Create posts with both text and images (supports image uploads).
- **Interactive Posts:**
  - Like and Dislike posts.
  - Comment on posts.
- **Dynamic Post Feed:**
  - Display posts from other users, including those from followers and following.
  - Implement infinite scroll for a seamless browsing experience.
- **Post Sharing:** A dedicated modal for easily sharing posts.

### 📖 Stories

- **Story Creation:** Users can create and share temporary stories.
- **Story Viewing:** Browse and view stories from other users.

### 💬 Real-time Chat

- **Direct Messaging:** Engage in one-on-one conversations with other users, including followers.
- **Online/Offline Status:** See the real-time status of other users.
- **Instant Messaging:** Real-time chat response for immediate communication.
- **Message Timestamps:** Display timestamps for when messages were sent and created.
- **Emoji Support:** Enhance conversations with emojis.
- **Auto-scroll:** Automatically scroll to the latest messages in a chat.

### 🧭 Navigation & User Interface

- **Intuitive Navigation:** Easy access to Home, Chat, and other sections.
- **Theme Toggle:** Switch between Dark Mode and Light Mode for personalized viewing.
- **Group Pages:** Navigate to various group pages, including different college-specific pages.
- **External Links:** Quick access to school official websites.
- **User Recommendations:** System to suggest users to follow.

## Technologies Used

TeknoKonek is built using the following technologies:

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - Redux: For predictable state management.
  - React Router DOM: For client-side routing.
  - CSS: For styling and responsive design.
- **Backend:**
  - Node.js: A JavaScript runtime for server-side development.
  - Express.js: A fast, unopinionated, minimalist web framework for Node.js.
  - MongoDB: A NoSQL database for storing application data.
  - Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  - Multer: For handling multipart/form-data, primarily used for file uploads.
  - jsonwebtoken: For implementing JWT-based authentication.
  - bcrypt: For hashing passwords securely.
  - dotenv: For loading environment variables from a `.env` file.
  - cors: For enabling Cross-Origin Resource Sharing.
- **Real-time Communication:**
  - Socket.io: A library for real-time, bidirectional, event-based communication.

## Setup Instructions

Follow these steps to set up and run TeknoKonek on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager, usually comes with Node.js)
- MongoDB (Community Server or access to a MongoDB Atlas cluster)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/TeknoKonek.git
cd TeknoKonek
```

### 2. Backend Setup (Server)

Navigate to the `server` directory, install dependencies, and configure environment variables.

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following. **Do not commit this file to version control.**

```
MONGO_DB="<your_mongo_db_connection_string>" # MongoDB connection URI (e.g., from MongoDB Atlas or local instance)
PORT="<your_port>" # Port for the backend server to listen on (e.g., 5000)
JWT_KEY="<your_jwt_key>" # A strong, random string for JWT authentication
EMAIL_HOST="<your_email_host>" # Host for the email service (e.g., smtp.gmail.com)
EMAIL_PORT="<your_email_port>" # Port for the email service (e.g., 587 for TLS)
EMAIL_USER="<your_email_user>" # Username for the email service
EMAIL_PASS="<your_email_pass>" # Password for the email service
EMAIL_FROM="<your_email_from>" # Email address to send from
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., from MongoDB Atlas or your local instance).
You can choose any port, e.g., `5000`.
`your_jwt_secret_key` should be a strong, random string.

Start the backend server:

```bash
npm run dev
```

The server will run on the specified PORT (e.g., `http://localhost:5000`).

### 3. Real-time Communication Setup (Socket)

Open a new terminal, navigate to the `socket` directory, install dependencies, and configure environment variables.

```bash
cd ../socket
npm install
```

Create a `.env` file in the `socket` directory and add the following. **Do not commit this file to version control.**

```
CORS_ORIGIN="<your_CORS_origin_here>" # The origin URL of your client application (e.g., http://localhost:3000)
PORT="<your_port_here>" # Port for the Socket.io server to listen on (e.g., 8800)
```

This should match the origin of your client application.

Start the socket server:

```bash
npm run dev
```

The socket server will run on port `8800`.

### 4. Frontend Setup (Client)

Open another new terminal, navigate to the `client` directory, install dependencies, and configure environment variables.

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add the following. **Do not commit this file to version control.**

```
REACT_APP_API_URL="<your_api_url>" # URL of the backend API server (e.g., http://localhost:5000)
REACT_APP_SOCKET_URL="<your_socket_url>" # URL of the Socket.io server (e.g., http://localhost:8800)
```

Ensure `REACT_APP_BASE_URL` matches your backend server's address and `REACT_APP_SOCKET_URL` matches your socket server's address.

Start the frontend application:

```bash
npm run dev
```

The client application will typically run on `http://localhost:3000`.
