import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
    recentStudents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await studentAPI.getAll();
      const students = response.data;
      
      const maleCount = students.filter(s => s.gender?.toLowerCase() === 'male').length;
      const femaleCount = students.filter(s => s.gender?.toLowerCase() === 'female').length;
      const recentStudents = students.slice(-5).reverse();
      
      setStats({
        totalStudents: students.length,
        maleStudents: maleCount,
        femaleStudents: femaleCount,
        recentStudents: recentStudents,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1 className="dashboard-title">Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">📚</div>
            <div className="stat-content">
              <h3>Total Students</h3>
              <p className="stat-number">{stats.totalStudents}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon male">👨‍🎓</div>
            <div className="stat-content">
              <h3>Male Students</h3>
              <p className="stat-number">{stats.maleStudents}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon female">👩‍🎓</div>
            <div className="stat-content">
              <h3>Female Students</h3>
              <p className="stat-number">{stats.femaleStudents}</p>
            </div>
          </div>
        </div>

        <div className="recent-section">
          <h2>Recent Students</h2>
          {stats.recentStudents.length > 0 ? (
            <div className="recent-students">
              {stats.recentStudents.map((student) => (
                <div key={student._id} className="recent-student-card">
                  <div className="student-avatar">
                    {student.firstname.charAt(0)}{student.lastname.charAt(0)}
                  </div>
                  <div className="student-info">
                    <h4>{student.firstname} {student.lastname}</h4>
                    <p>{student.gender || 'Not specified'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No students registered yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;