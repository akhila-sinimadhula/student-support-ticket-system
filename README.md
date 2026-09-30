# Student Support & Ticket Management System

A full-stack web application for managing student support requests, support tickets, staff assignments, escalations, pending actions, and ticket resolutions.

The system provides secure staff authentication, role-based access control, ticket lifecycle management, and a dashboard for monitoring support activities.

## Features

### Authentication & Authorization

* JWT-based staff authentication
* Secure password hashing using bcrypt
* Protected frontend routes
* Protected backend API endpoints
* Role-based access control
* Admin-only staff management
* Staff name and role displayed in the application header
* Role-based navigation

### Student Management

* Create students
* View student details
* Update student information
* Search and view student-related tickets
* Email and student-code validation

### Ticket Management

* Create support tickets
* View all tickets
* View individual ticket details
* Search tickets
* Filter tickets by status
* Update ticket status
* Update ticket priority
* Assign tickets to staff
* Escalate tickets
* Automatic escalation for critical-priority tickets

### Pending Actions

* Create pending actions for tickets
* Set due dates
* Track pending-action status
* Detect overdue actions
* Automatically escalate tickets when actions become overdue
* Automatically complete pending actions when a ticket is resolved

### Ticket Resolution

* Add resolution notes
* Resolve tickets
* Store resolution details
* Automatically update ticket status
* Maintain ticket activity history

### Activity History

Each ticket maintains an activity timeline for important actions such as:

* Ticket creation
* Status changes
* Priority changes
* Staff assignment
* Escalation
* Pending-action updates
* Ticket resolution

### Staff Management

Administrators can:

* View staff members
* Add staff members
* View staff details
* Update staff information

Regular staff members can work with student support tickets but cannot access staff-management functionality.

## Dashboard

The dashboard provides an overview of the support system, including:

* Ticket statistics
* Recent tickets
* Ticket status information
* Quick navigation to ticket management

## Technology Stack

### Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT
* Passlib / bcrypt

### Database

* MySQL

### Architecture

```text
Next.js + React
       |
       | REST API
       ↓
FastAPI + Python
       |
       | SQLAlchemy
       ↓
     MySQL
```

## Project Structure

```text
student-support-system/
│
├── backend/
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── database.py
│   ├── main.py
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── config/
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Structure

The backend is organized using separate routers and service layers.

Main API areas include:

```text
/auth
/students
/tickets
/staff
/pending-actions
/ticket-resolutions
```

The application also provides database health checking through:

```text
GET /health/database
```

## Authentication Flow

```text
User Login
    ↓
FastAPI Authentication API
    ↓
Verify Email & Password
    ↓
Generate JWT Access Token
    ↓
Frontend Stores Token
    ↓
Token Sent With API Requests
    ↓
Backend Validates Token
    ↓
Role-Based Authorization
```

## Ticket Workflow

```text
Create Ticket
      ↓
Assign Staff
      ↓
Update Status / Priority
      ↓
Create Pending Action
      ↓
      ├── Action Completed
      │
      └── Action Overdue
              ↓
          Escalate Ticket
      ↓
Resolve Ticket
      ↓
Complete Remaining Pending Actions
      ↓
Store Resolution
```

## Roles

The application supports different staff roles.

### Admin

* Access dashboard
* Manage students and tickets
* Manage staff
* Perform support operations

### Technical Staff

* Access dashboard
* Manage students and tickets
* Perform support operations
* Cannot manage staff accounts

### Financial Payment

* Access dashboard
* Manage students and tickets
* Perform support operations
* Cannot manage staff accounts

## Local Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd student-support-system
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=your_mysql_database_url
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

## Environment Variables

Environment files contain local configuration and credentials and should **not** be committed to Git.

Example:

```env
DATABASE_URL=your_database_connection_string
```

## Security

The project includes:

* Password hashing
* JWT authentication
* Protected API routes
* Protected frontend routes
* Role-based authorization
* Environment-based database configuration
* Git ignore rules for sensitive environment files

## Future Improvements

Possible future improvements include:

* Refresh-token authentication
* Email notifications
* Advanced reporting and analytics
* File attachments for tickets
* Pagination for large ticket lists
* Automated tests
* Production deployment
* Audit logging improvements

## Author

**Sinimadhula B Akhila**

Built as a full-stack student support and ticket management application using Next.js, FastAPI, Python, SQLAlchemy, and MySQL.
