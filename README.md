# Complete Auth - Full Stack Authentication System

A complete authentication system built with Django REST Framework (backend) and React with Vite (frontend), featuring email verification, password reset, and Google OAuth integration.

## Features

- 🔐 User Registration with Email Verification
- 🔑 Secure Login/Logout with JWT Authentication
- 📧 Password Reset via OTP (One-Time Password)
- 🌐 Google OAuth Integration
- ✉️ Email Verification for New Users
- 📱 Responsive Material-UI Design
- 🔄 Token Refresh Mechanism
- 👤 Protected Dashboard

## Tech Stack

### Backend

- **Django 4.x** - Web framework
- **Django REST Framework** - API development
- **JWT Authentication** - Secure token-based auth
- **MySQL** - Database
- **SMTP Email** - Email delivery

### Frontend

- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL 8.0+
- Gmail account (for SMTP email)

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
```

**Configure Frontend Environment (.env):**

Edit `frontend/front/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# App Configuration
VITE_APP_NAME="Complete Auth"
VITE_APP_VERSION=1.0.0
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   **For Development:**

```
http://localhost:5173
http://127.0.0.1:5173
```

**For Production:**

```
https://yourdomain.com
https://www.yourdomain.com
```

#### **B. Authorized Redirect URIs**

Add these URLs if needed:

**For Development:**

```
http://localhost:5173/auth/callback
http://127.0.0.1:5173/auth/callback
```

**For Production:**

```
https://yourdomain.com/auth/callback
https://www.yourdomain.com/auth/callback
```

### 5. Email Configuration

For Gmail SMTP:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App-Specific Password
3. Use this password in `EMAIL_HOST_PASSWORD`
