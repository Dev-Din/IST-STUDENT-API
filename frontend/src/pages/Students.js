import React, { useState, useEffect } from "react";
import { studentAPI } from "../services/api";
import Loading from "../components/Loading";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    age: "",
    course: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, genderFilter]);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await studentAPI.getAll();

      // Filter out incomplete student records
      const validStudents = data.filter(
        (student) => student.firstName && student.lastName
      );

      // Sort students by creation time (newest first)
      const sortedData = validStudents.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setStudents(sortedData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          (student.firstName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (student.lastName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (student.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply gender filter
    if (genderFilter !== "All") {
      filtered = filtered.filter((student) => student.gender === genderFilter);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";

    // Email is optional, but if provided, must be valid
    if (
      formData.email &&
      formData.email.trim() &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      errors.email = "Email is invalid";
    }

    // Age is optional, but if provided, must be in valid range
    if (formData.age && (formData.age < 16 || formData.age > 100)) {
      errors.age = "Age must be between 16 and 100";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await studentAPI.create(formData);
      setAlert({ type: "success", message: "Student added successfully!" });
      setShowAddModal(false);
      resetForm();
      loadStudents();
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Failed to add student",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !selectedStudent) return;

    setIsSubmitting(true);
    try {
      await studentAPI.update(selectedStudent._id, formData);
      setAlert({ type: "success", message: "Student updated successfully!" });
      setShowEditModal(false);
      resetForm();
      loadStudents();
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Failed to update student",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;

    setIsSubmitting(true);
    try {
      await studentAPI.delete(selectedStudent._id);
      setAlert({ type: "success", message: "Student deleted successfully!" });
      setShowDeleteModal(false);
      setSelectedStudent(null);
      loadStudents();
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Failed to delete student",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "Male",
      age: "",
      course: "",
    });
    setFormErrors({});
    setSelectedStudent(null);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      email: student.email || "",
      gender: student.gender || "Male",
      age: student.age || "",
      course: student.course || "",
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "age" ? (value === "" ? "" : parseInt(value) || "") : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="students-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Students</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus me-2"></i>
          Add Student
        </button>
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadStudents}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="text-muted">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="card-body">
          {currentStudents.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No students found</h5>
              <p className="text-muted">
                {students.length === 0
                  ? "Start by adding your first student"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Course</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student) => (
                      <tr key={student._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-user text-primary"></i>
                            </div>
                            <div>
                              <div className="fw-bold">
                                {student.firstName} {student.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{student.email || "N/A"}</td>
                        <td>
                          <span
                            className={`badge ${
                              student.gender === "Male"
                                ? "bg-info"
                                : "bg-success"
                            }`}
                          >
                            {student.gender || "N/A"}
                          </span>
                        </td>
                        <td>{student.age || "N/A"}</td>
                        <td>{student.course || "N/A"}</td>
                        <td>
                          {student.createdAt
                            ? new Date(student.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditModal(student)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => openDeleteModal(student)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      <div
        className={`modal fade ${showAddModal ? "show" : ""}`}
        style={{ display: showAddModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Student</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              ></button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.firstName ? "is-invalid" : ""
                      }`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {formErrors.firstName && (
                      <div className="invalid-feedback">
                        {formErrors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.lastName ? "is-invalid" : ""
                      }`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {formErrors.lastName && (
                      <div className="invalid-feedback">
                        {formErrors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Age (Optional)</label>
                    <input
                      type="number"
                      className={`form-control ${
                        formErrors.age ? "is-invalid" : ""
                      }`}
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="16"
                      max="100"
                      disabled={isSubmitting}
                    />
                    {formErrors.age && (
                      <div className="invalid-feedback">{formErrors.age}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Course (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Adding...
                    </>
                  ) : (
                    "Add Student"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      <div
        className={`modal fade ${showEditModal ? "show" : ""}`}
        style={{ display: showEditModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Student</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
              ></button>
            </div>
            <form onSubmit={handleEdit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.firstName ? "is-invalid" : ""
                      }`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {formErrors.firstName && (
                      <div className="invalid-feedback">
                        {formErrors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.lastName ? "is-invalid" : ""
                      }`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {formErrors.lastName && (
                      <div className="invalid-feedback">
                        {formErrors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Age (Optional)</label>
                    <input
                      type="number"
                      className={`form-control ${
                        formErrors.age ? "is-invalid" : ""
                      }`}
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="16"
                      max="100"
                      disabled={isSubmitting}
                    />
                    {formErrors.age && (
                      <div className="invalid-feedback">{formErrors.age}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Course (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Student"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedStudent(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {selectedStudent?.firstName} {selectedStudent?.lastName}
                </strong>
                ?
              </p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedStudent(null);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete Student"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {(showAddModal || showEditModal || showDeleteModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default Students;
