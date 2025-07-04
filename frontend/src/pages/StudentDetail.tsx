import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentsAPI } from '../services/api';
import { Student } from '../types';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStudent(id);
    }
  }, [id]);

  const fetchStudent = async (studentId: string) => {
    try {
      setIsLoading(true);
      const data = await studentsAPI.getById(studentId);
      setStudent(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch student');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!student || !id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.firstname} ${student.lastname}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      await studentsAPI.delete(id);
      navigate('/students');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <div className="mt-2">
              <Link to="/students" className="text-red-800 underline">
                Back to Students
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Student not found</h2>
            <p className="mt-2 text-gray-600">The student you're looking for doesn't exist.</p>
            <Link
              to="/students"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Back to Students
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {student.firstname} {student.lastname}
              </h1>
              <p className="mt-2 text-gray-600">Student Details</p>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/students/${student._id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Edit Student
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete Student'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Student Information Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
          </div>
          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">First Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.firstname}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.lastname}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.firstname} {student.lastname}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.gender || 'Not specified'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{student._id}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between">
          <Link
            to="/students"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            ← Back to Students
          </Link>
          <div className="flex space-x-3">
            <Link
              to={`/students/${student._id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Edit This Student
            </Link>
            <Link
              to="/students/new"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add New Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;