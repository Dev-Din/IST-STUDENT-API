# Student Management System - React Frontend

A modern, responsive React frontend for the Student Management System built with JavaScript, Bootstrap 5, and Font Awesome icons.

## 🚀 Features

- **Modern React**: Built with React 18 and functional components using hooks
- **Responsive Design**: Mobile-first design using Bootstrap 5
- **Authentication**: JWT-based login and registration
- **Student Management**: Complete CRUD operations with search, filter, and pagination
- **User Profile**: Profile management with password change functionality
- **Clean UI**: Navy Blue theme with Font Awesome icons
- **API Integration**: Seamless integration with Node.js backend

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.js           # Main layout wrapper
│   ├── Sidebar.js          # Navigation sidebar
│   ├── Navbar.js           # Top navigation bar
│   └── Loading.js          # Loading spinner component
├── pages/
│   ├── Login.js            # Login page
│   ├── Register.js         # Registration page
│   ├── Dashboard.js        # Dashboard with statistics
│   ├── Students.js         # Student management page
│   └── Profile.js          # User profile page
├── services/
│   └── api.js              # API service layer
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── App.js                  # Main application component
├── index.js                # Application entry point
└── index.css               # Global styles with Bootstrap theme
```

## 🛠️ Installation

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Setup**:

   - Ensure the backend API is running on `http://localhost:4000`
   - No additional environment variables needed

3. **Start Development Server**:

   ```bash
   npm start
   ```

4. **Bootstrap Styles**: Bootstrap CSS is imported in `index.js`

## 📦 Dependencies

### Core Dependencies

- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library

### Development Dependencies

- **React Scripts**: Create React App tooling
- **Testing Libraries**: Jest and React Testing Library

## 🎨 UI Components

### Layout Components

- **Layout**: Main wrapper with sidebar and content area
- **Sidebar**: Collapsible navigation with responsive mobile support
- **Navbar**: Top navigation with user dropdown and mobile toggle

### Page Components

- **Dashboard**: Statistics cards and quick actions
- **Students**: Table with search, filter, pagination, and CRUD modals
- **Profile**: User information and password change form
- **Authentication**: Login and registration forms

## 🔌 API Integration

The frontend communicates with the Node.js backend through:

- **Authentication endpoints**: Login, register, change password
- **Student endpoints**: CRUD operations with search and filtering
- **JWT token management**: Automatic token inclusion in requests
- **Error handling**: User-friendly error messages and validation

## 🎯 Features in Detail

### Student Management

- **Search**: Real-time search by name or email
- **Filter**: Filter by gender (All, Male, Female)
- **Pagination**: 10 students per page with navigation
- **CRUD Operations**: Add, edit, delete with Bootstrap modals
- **Validation**: Client-side form validation
- **Sorting**: Students sorted by creation date (newest first)

### Authentication

- **JWT Tokens**: Secure authentication with localStorage
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Form Validation**: Real-time validation with error messages
- **Password Security**: Minimum length requirements

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Collapsible Sidebar**: Mobile-friendly navigation
- **Responsive Tables**: Horizontal scroll on small screens
- **Touch-Friendly**: Large touch targets for mobile

## 🚀 Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run test suite
- `npm run eject`: Eject from Create React App

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

Fully responsive design with:

- Mobile-optimized navigation
- Touch-friendly interactions
- Responsive tables and forms
- Optimized for various screen sizes

## 🔧 Configuration

The app is configured to work with:

- **Backend API**: `http://localhost:4000/api`
- **Development Server**: `http://localhost:3000`
- **Bootstrap Theme**: Navy Blue primary color (#1e3a8a)

## 🎨 Customization

To customize the theme:

1. Edit `src/index.css` for global styles
2. Modify Bootstrap variables for theme colors
3. Update component-specific styles as needed

## 🚀 Deployment

For production deployment:

1. Run `npm run build`
2. Serve the `build` folder with a static file server
3. Configure API endpoints for production environment

---

Built with ❤️ using React, Bootstrap 5, and modern web technologies.
