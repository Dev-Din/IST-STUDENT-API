# Student Management System - Frontend

A modern React TypeScript frontend application for the Student Management System API.

## 🚀 Features

- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Authentication**: JWT-based authentication with protected routes
- **Student Management**: Complete CRUD operations for student records
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Dynamic data updates without page refresh
- **Search & Filter**: Search students by name or gender
- **Dashboard Analytics**: Visual statistics and insights

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on http://localhost:4000

## 🚀 Installation & Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation component
│   │   └── ProtectedRoute.tsx   # Route protection
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── pages/
│   │   ├── Home.tsx             # Landing page
│   │   ├── Login.tsx            # Login page
│   │   ├── Register.tsx         # Registration page
│   │   ├── Dashboard.tsx        # Dashboard with stats
│   │   ├── Students.tsx         # Students list
│   │   ├── StudentForm.tsx      # Add/Edit student form
│   │   └── StudentDetail.tsx    # Student details view
│   ├── services/
│   │   └── api.ts               # API service layer
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # App entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── tailwind.config.js           # Tailwind configuration
├── package.json
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication:

- **Login**: Email and password authentication
- **Registration**: New user account creation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token refresh and logout on expiry

## 📚 Available Pages

### Public Pages
- **Home** (`/`): Landing page with features overview
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

### Protected Pages (Require Authentication)
- **Dashboard** (`/dashboard`): Overview with statistics
- **Students List** (`/students`): View all students with search
- **Add Student** (`/students/new`): Create new student record
- **Student Details** (`/students/:id`): View individual student
- **Edit Student** (`/students/:id/edit`): Update student information

## 🎨 UI Components

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation with feedback
- **Search Functionality**: Real-time search filtering
- **Confirmation Dialogs**: Safe delete operations

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Danger**: Red (#dc2626)
- **Background**: Gray (#f9fafb)

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## 🌐 API Integration

The frontend communicates with the backend API through:

- **Base URL**: Configurable via `REACT_APP_API_URL`
- **Authentication**: JWT tokens in Authorization headers
- **Error Handling**: Centralized error management
- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Automatic logout on 401 errors

### API Endpoints Used

#### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

#### Students
- `GET /api/getAllStudents` - Fetch all students
- `GET /api/getStudent/:id` - Fetch student by ID
- `POST /api/addStudent` - Create new student
- `PATCH /api/updateStudent/:id` - Update student
- `DELETE /api/deleteStudent/:id` - Delete student

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and validation
- **Protected Routes**: Route-level authentication checks
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Secure cross-origin requests

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured interface
- **Tablet**: Adapted layout with touch-friendly elements
- **Mobile**: Simplified navigation and optimized forms

## 🚨 Error Handling

Comprehensive error handling includes:

- **Network Errors**: Connection and timeout handling
- **API Errors**: Server error message display
- **Validation Errors**: Form field validation feedback
- **Authentication Errors**: Automatic logout and redirection
- **404 Errors**: Graceful handling of missing resources

## 🔄 State Management

Using React Context API for:

- **Authentication State**: User login status and data
- **Global Loading States**: Application-wide loading indicators
- **Error States**: Centralized error management
- **Token Management**: JWT token lifecycle

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Memoization**: React.memo for expensive components
- **Optimized Builds**: Production-ready minified bundles
- **Image Optimization**: Responsive image handling
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🧪 Testing

The application includes:

- **Unit Tests**: Component testing with Jest
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user flow testing
- **Accessibility Tests**: WCAG compliance testing

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Amazon CloudFront, Cloudflare
- **Container**: Docker deployment
- **Server**: Express.js static serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation
- Review the backend README
- Open an issue in the repository
