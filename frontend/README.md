# GameShop - Transactions Game Online Web App FE

## 1. Introduction

GameShop Frontend is a React.js-based web application designed to provide a seamless experience for users buying and managing games online. It connects with the GameShop Backend to enable secure authentication, transactions, and real-time interactions.

- **Authentication**: Secure login and user registration.
- **Customer Dashboard**: View purchased games, browse the store, and make purchases.
- **Game Management**: Add, update, and delete games from the marketplace.
- **WebSocket Integration**: Enables real-time communication, such as live chat support.

## 2. Tech Stack

- React.js - Frontend framework
- Redux Toolkit - State management
- Tailwind CSS - Modern UI styling
- Axios - HTTP requests
- React Router - Navigation and routing

## 3. Installation & Configuration

Clone the repository

```
$ git clone https://github.com/tqhuy2001/GameShop.git
$ cd frontend
```

Install dependencies and set up the environment variables

```
$ npm install
```

## 4. Running the Application

Run the application

```
$ npm start  # Start development server on port 3000
```

## 6. API Integration

This frontend communicates with the GameShop Backend built with FastAPI.

- Backend API URL: http://localhost:8000 (Configurable via .env).
- Uses JWT authentication for secure API requests.

## 7. Troubleshooting

- Ensure all environment variables are set correctly
- Check if the database is running and accessible