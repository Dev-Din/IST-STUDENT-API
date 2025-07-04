import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import toast from 'react-hot-toast';
import StudentModal from '../components/StudentModal';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await studentAPI.update(editingStudent._id, formData);
        toast.success('Student updated successfully');
      } else {
        await studentAPI.create(formData);
        toast.success('Student added successfully');
      }
      fetchStudents();
      handleModalClose();
    } catch (error) {
      toast.error(editingStudent ? 'Failed to update student' : 'Failed to add student');
    }
  };

  const filteredStudents = students.filter(student =>
    student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.gender && student.gender.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="container">
        <div className="students-header">
          <h1>Students Management</h1>
          <button onClick={handleAdd} className="btn btn-primary">
            Add New Student
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search students by name or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredStudents.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.gender || 'Not specified'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(student)}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            {searchTerm ? 'No students found matching your search.' : 'No students registered yet.'}
          </div>
        )}

        {showModal && (
          <StudentModal
            student={editingStudent}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Students;