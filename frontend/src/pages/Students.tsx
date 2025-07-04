import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsAPI } from '../services/api';
import { Student } from '../types';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await studentsAPI.getAll();
      setStudents(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      await studentsAPI.delete(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredStudents = students.filter(student =>
    student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.gender && student.gender.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students</h1>
              <p className="mt-2 text-gray-600">
                Manage your student records
              </p>
            </div>
            <Link
              to="/students/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add New Student
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={fetchStudents}
              className="ml-2 text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm ? 'No students found matching your search.' : 'No students found.'}
              </div>
              {!searchTerm && (
                <Link
                  to="/students/new"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Add Your First Student
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstname} {student.lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.gender || 'Not specified'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/students/${student._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <Link
                            to={`/students/${student._id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(student._id, `${student.firstname} ${student.lastname}`)}
                            disabled={deleteLoading === student._id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {deleteLoading === student._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredStudents.length > 0 && (
          <div className="mt-6 text-sm text-gray-500 text-center">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;