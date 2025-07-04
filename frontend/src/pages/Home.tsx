import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Student Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern, secure, and efficient platform for managing student records. 
            Built with React, TypeScript, and Node.js with JWT authentication.
          </p>

          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Welcome back! Ready to manage your students?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/students"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  View Students
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Get started by creating an account or signing in.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                JWT-based authentication with password hashing and secure token management.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Management</h3>
              <p className="text-gray-600">
                Complete CRUD operations for student records with search and filtering capabilities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Analytics</h3>
              <p className="text-gray-600">
                Real-time statistics and insights about your student database.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Built With Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">R</span>
              </div>
              <p className="text-sm font-medium text-gray-900">React</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">TS</span>
              </div>
              <p className="text-sm font-medium text-gray-900">TypeScript</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-600">N</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Node.js</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-600">M</span>
              </div>
              <p className="text-sm font-medium text-gray-900">MongoDB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;