# GameShop - Transactions Game Online Web App BE

## 1. Introduction

GameShop Backend is a RESTful API built with FastAPI to handle transactions for purchasing games on a web platform. The system includes key features such as:

- **User Management**: Registration, login, and authentication using JWT/OAuth2.
- **Game Management**: Add, update, delete, and review games before listing them for sale.
- **Shopping Cart**: Allows users to buy games.
- **Interacting**: Users can interact about games or shop manager.
- **High Performance**: Optimized with Asynchronous FastAPI, MySQL.

## 2. Prerequisites

- Python: v3.12.3
- Make: v3.82.90

## 3. Installation & Configuration

Clone the repository

```
$ git clone https://github.com/tqhuy2001/GameShop.git
$ cd backend
```

Install dependencies and set up the environment variables

```
$ make ready
```

## 4. Database Setup
- With MySQL Database
- Create folder alembic/versions

```
$ make revision # Initialize a message
$ make heads # Generate alembic-database initialization in alembic/versions
$ make migrate # Migrate MySQL database
```

## 5. Firebase Setup
- Get the firebase credentials on firebase console
- Create file backend/credentials_firebase.json
- Copy credentials downloaded and paste to credentials_firebase.json just created

```
$ make revision # Generate alembic-database initialization in alembic/versions
$ make migrate-up # Apply migrations
$ make migrate-down # Revert last migration
$ make heads # Check the heads version of alembic
```

## 6. Running the Application

Run the application

```
$ make run port=8000  # Runs the application on port 8000 (Able to change)
```

## 7. Usage and group endpoints

### Init admin
Initializing admin to control all permissions.
### Authentication
Handling authentication.
- Login/Register: **POST /login**
```
{
  "username": "username",
  "password": "password123"
}
```
- My info: **GET /user/get-info** - Require authorization

### Customer
Handling customer operations (buying, get games bought,...).
### Manager
Handling manager operations (get bill, recharge,...).
### Games
Handling tasks related to game management (add, update, delete,...).
### Websocket
Connect to handle chatting.

## 8. Troubleshooting

- Ensure all environment variables are set correctly
- Check if the database is running and accessible