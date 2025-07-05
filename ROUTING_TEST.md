# Student Management System - Routing Test Guide

## Overview

The Student Management System now has client-side routing with URL management for different views and actions.

## Available Routes

### Authentication Routes

- `/` or `/login` - Login page
- `/register` - Registration page

### Protected Routes (require authentication)

- `/dashboard` - Main dashboard with student statistics
- `/students` - Student management page with table
- `/students/add` - Opens student creation modal
- `/students/edit/:id` - Opens student edit modal for specific student
- `/profile` - User profile management

## Testing the Routing

### 1. Access the Application

Open your browser and navigate to: `http://localhost:4000`

### 2. Test Authentication Flow

1. Start at `/login` (default route)
2. Click "Register" tab to navigate to `/register`
3. Register a new account or login with existing credentials
4. After successful authentication, you'll be redirected to `/dashboard`

### 3. Test Navigation

Once logged in, you can:

- Click "Dashboard" in navigation to go to `/dashboard`
- Click "Students" in navigation to go to `/students`
- Click "Profile" in navigation to go to `/profile`

### 4. Test Student Management Routes

On the Students page:

- Click "Add Student" button to navigate to `/students/add`
- Click "Edit" button on any student to navigate to `/students/edit/:id`
- Use browser back/forward buttons to test navigation history

### 5. Test URL Direct Access

Try accessing these URLs directly in the browser:

- `http://localhost:4000#/dashboard`
- `http://localhost:4000#/students`
- `http://localhost:4000#/profile`
- `http://localhost:4000#/students/add`

### 6. Test Authentication Protection

- Try accessing protected routes without being logged in
- You should be redirected to `/login`

## Features Implemented

### 1. Client-Side Router

- Hash-based routing (`#/route`)
- Browser history management
- Route parameter extraction
- Route protection for authenticated users

### 2. Navigation Management

- Active link highlighting
- Programmatic navigation
- Modal state management with routes

### 3. View Management

- Single Page Application (SPA) behavior
- Dynamic view switching
- State preservation between routes

### 4. URL Integration

- Bookmarkable URLs
- Browser back/forward button support
- Direct URL access
- Route-based modal management

## API Endpoints (Updated)

### Authentication

- `POST /api/register` - User registration
- `POST /api/login` - User login

### Students (RESTful)

- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get specific student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### User Management

- `POST /api/change-password` - Change user password

## Browser Console Testing

Open browser developer tools and test these JavaScript commands:

```javascript
// Navigate programmatically
navigateTo("/dashboard");
navigateTo("/students");
navigateTo("/profile");

// Test route handling
console.log("Current route:", window.location.hash);

// Test authentication state
console.log("Current user:", currentUser);
console.log("Current token:", currentToken ? "Present" : "Not present");
```

## Expected Behavior

1. **URL Updates**: URLs should update when navigating between views
2. **Browser History**: Back/forward buttons should work correctly
3. **Route Protection**: Unauthenticated users should be redirected to login
4. **Modal Management**: Add/Edit student actions should update URLs
5. **Navigation Highlighting**: Active nav links should be highlighted
6. **State Persistence**: Application state should be maintained during navigation

## Troubleshooting

If routing isn't working:

1. Check browser console for JavaScript errors
2. Verify server is running on port 4000
3. Clear browser cache and localStorage
4. Check network tab for API request/response issues

## Success Criteria

✅ All routes are accessible and functional
✅ Navigation updates URLs correctly
✅ Browser history works with back/forward buttons
✅ Authentication protection works
✅ Modal actions update URLs appropriately
✅ API endpoints work with new routing structure
✅ User experience is smooth and intuitive
