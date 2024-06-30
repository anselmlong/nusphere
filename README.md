# NUSphere

NUSphere is  comprehensive, user-friendly web application that serves as a one-stop portal for all NUS-related events. Students can both publicise and find out events of their interests easily with the filter functions. Our goal is to simplify how events are shared, discovered, and managed, ensuring that no valuable opportunity for learning, networking, or socialising is missed. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)


## Prerequisites

Ensure you have the following installed:

- Golang (>= 1.16)
- Node.js (>= 14.x)
- PostgreSQL (>= 12.x)
- Git


## Setup Instructions

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/anselmlong/nusphere.git
   cd nusphere/go-backend

2. **Install dependencies:**
    ```sh
    go mod tidy

3. **Configure the environment variables:**
    Create a .env file in the backend directory with the following content:
    ```bash
    DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/yourdb?sslmode=disable

3. **Create the events and users table in PostgreSQL:**
    ```sql
    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        date VARCHAR(50),
        description TEXT,
        image_url VARCHAR(255),
        type VARCHAR(50),
        price VARCHAR(50),
        user_id INT REFERENCES users(id)
    );

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        google_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );

4. **Run the backend server:**
    ```sh
    go run main.go


### Frontend Setup
1. **Install dependencies:**
    ```sh
    npm install
    
2. **Run the frontend development server:**
    ```sh
    npm start


### Running the Application
1. Start the backend server by running the command in the backend directory:
    ```sh
    go run main.go

2. Start the frontend development server by running the command in the frontend directory:
    ```sh
    npm start

3. Open your browser and navigate to http://localhost:3000 to view the application.


### API Endpoints
GET /events: Retrieve all events.

POST /events: Create a new event.

PUT /events/: Update an existing event.

DELETE /events/: Delete an event.


### License
This project is licensed under the MIT License - see the LICENSE file for details.
