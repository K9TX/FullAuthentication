# Complete Auth - Full Stack Authentication System

A complete authentication system built with Django REST Framework (backend) and React with Vite (frontend), featuring email verification, password reset, and Google OAuth integration.

## Features

- 🔐 User Registration with Email Verification
- 🔑 Secure Login/Logout with JWT Authentication
- 📧 Password Reset via OTP (One-Time Password)
- 🌐 Google OAuth Integration
- ✉️ Email Verification for New Users
- 📱 Responsive Material-UI Design
- 👤 Protected Dashboard

## Tech Stack

### Backend

- **Django 4.x** - Web framework
- **Django REST Framework** - API development
- **JWT Authentication** - Secure token-based auth
- **MySQL** - Database

### Frontend

- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL 8.0+

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Complete_Auth-main
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

**Configure Backend Environment (.env):**

**Database Setup:**

```bash
# Create database in MySQL

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

python manage.py runserver
```

### 3. Frontend Setup

```bash
cd ../frontend/front

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

npm run dev
```

