# Users API and React Frontend

This project demonstrates a simple API in the backend and a React frontend that fetches and displays user data.

## Project Structure

- `apps/backend`: Express.js API server
- `apps/react-monorepo`: React frontend application

## Running the Application

### Option 1: Start Both Services with a Single Command (Recommended)

```bash
# From the root directory
npm run dev
```

This will use Nx's run-many command to start both the backend and frontend servers in parallel:
- Backend server: http://localhost:3000
- Frontend application: http://localhost:4200

### Option 2: Start Services Individually

#### Start the Backend Server

```bash
# From the root directory
nx serve backend
```

The backend server will start at http://localhost:3000

#### Start the Frontend Server

```bash
# From the root directory
nx serve react-monorepo
```

The frontend application will start at http://localhost:4200

## API Endpoints

- `GET /api/users`: Returns a list of users

## Features

- Backend API with Express.js
- Frontend with React and React Router
- Tailwind CSS for styling
- Responsive user list with fallback for missing images
- Error handling for API requests

## Implementation Details

### Backend

The backend is a simple Express.js server that provides a REST API endpoint to fetch user data.

### Frontend

The frontend is a React application that fetches data from the backend API and displays it in a user-friendly interface. It includes:

1. A home page with a welcome message
2. A users page that displays the list of users
3. Navigation between pages using React Router
