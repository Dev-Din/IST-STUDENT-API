# Student Management System

A complete full-stack application built with Node.js, Express, MongoDB, and a modern responsive frontend for managing student records with user authentication and authorization.

## 🚀 Features

### Backend Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Student Management**: Full CRUD operations for student records
- **Data Validation**: Input validation using Joi schema validation
- **Password Security**: Bcrypt hashing for secure password storage
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **MongoDB Integration**: MongoDB database with Mongoose ODM
- **Environment Configuration**: Environment variables for secure configuration
- **Protected Routes**: Authentication middleware for secure API access

### Frontend Features

- **Modern UI**: Clean, responsive design with gradient backgrounds and glassmorphism effects
- **User Authentication**: Tabbed login/register interface with form validation
- **Student Dashboard**: Interactive table with add, edit, and delete functionality
- **Modal Forms**: Smooth modal dialogs for adding and editing students
- **Real-time Feedback**: Loading states, success messages, and error handling
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Local Storage**: Persistent login sessions using browser storage
- **Auto-logout**: Automatic logout on token expiration

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Joi
- **UI Framework**: Custom CSS with Font Awesome icons
- **Development**: Nodemon for auto-restart

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🚀 Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Student-API
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory with the following variables:

    ```env
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/student-api
    DB_NAME=student-api
    JWT_SECRET=your-secret-key-here
    ```

4.  **Start the server**

    ```bash
    npm start
    ```

        The server will start on `http://localhost:4000`

    **Access the application:**

    - Frontend: http://localhost:4000
    - API Endpoints: http://localhost:4000/api

## 📚 API Endpoints

### Authentication Endpoints

#### Register User

- **POST** `/api/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user data and JWT token

#### Login User

- **POST** `/api/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns user data and JWT token

### Student Management Endpoints

#### Create Student

- **POST** `/api/addStudent`
- **Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "gender": "Male"
  }
  ```

#### Get All Students

- **GET** `/api/getAllStudents`
- **Response**: Returns array of all students

#### Get Student by ID

- **GET** `/api/getStudent/:id`
- **Response**: Returns specific student data

#### Update Student

- **PATCH** `/api/updateStudent/:id`
- **Body**: Any combination of student fields
  ```json
  {
    "firstname": "Jane",
    "lastname": "Smith"
  }
  ```

#### Delete Student

- **DELETE** `/api/deleteStudent/:id`
- **Response**: Returns deleted student data

## 📁 Project Structure

```
Student-API/
├── controllers/
│   ├── studentController.js    # Student CRUD operations
│   └── userController.js       # User authentication
├── helpers/
│   ├── bcryptHelper.js         # Password hashing utilities
│   ├── init-mongodb.js         # MongoDB connection setup
│   ├── jwtHelper.js            # JWT token utilities
│   └── validationschema.js     # Input validation schemas
├── middleware/
│   └── auth.js                 # Authentication middleware
├── models/
│   ├── studentmodel.js         # Student data model
│   └── usermodel.js            # User data model
├── public/                     # Frontend files
│   ├── index.html              # Main HTML file
│   ├── styles.css              # CSS styles
│   └── script.js               # Frontend JavaScript
├── routes/
│   ├── api.js                  # Student routes (protected)
│   └── userroutes.js           # User authentication routes
├── index.js                    # Main application entry point
├── package.json                # Project dependencies
└── seedUsers.js                # Database seeding script
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Proper error responses without exposing sensitive information
- **Environment Variables**: Sensitive configuration stored in environment variables

## 🗄️ Database Models

### User Model

- `email` (String, required, unique): User's email address
- `password` (String, required): Hashed password (min 6 characters)

### Student Model

- `firstname` (String, required): Student's first name
- `lastname` (String, required): Student's last name
- `gender` (String): Student's gender

## 🧪 Testing the Application

### Frontend Testing

1. **Start the server**: `npm start`
2. **Open your browser**: Navigate to `http://localhost:4000`
3. **Register/Login**: Create an account or login with existing credentials
4. **Manage Students**: Use the intuitive interface to add, edit, and delete students

### API Testing

You can also test the API endpoints directly using tools like:

- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)
- **Insomnia**

### Example cURL Commands

```bash
# Register a new user
curl -X POST http://localhost:4000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Add a student
curl -X POST http://localhost:4000/api/addStudent \
  -H "Content-Type: application/json" \
  -d '{"firstname": "John", "lastname": "Doe", "gender": "Male"}'

# Get all students
curl -X GET http://localhost:4000/api/getAllStudents
```

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: Resource not found
- **409 Conflict**: User already exists
- **500 Internal Server Error**: Server-side errors

## 🔧 Development

### Running in Development Mode

```bash
npm start
```

This uses nodemon for automatic server restart on file changes.

### Environment Variables

Make sure to set up your `.env` file with the required variables:

- `PORT`: Server port (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT token signing

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.
