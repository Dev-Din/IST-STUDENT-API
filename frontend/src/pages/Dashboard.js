import React, { useState, useEffect } from "react";
import { studentAPI } from "../services/api";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, male: 0, female: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsData = await studentAPI.getStats();
      setStats(statsData);
    } catch (err) {
      setError("Failed to fetch statistics");
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard</h1>
        <div className="text-muted">
          <i className="fas fa-calendar-alt me-2"></i>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Total Students</h6>
                  <h2 className="mb-0">{stats.total}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Male Students</h6>
                  <h2 className="mb-0">{stats.male}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="fas fa-male"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-0">Female Students</h6>
                  <h2 className="mb-0">{stats.female}</h2>
                </div>
                <div className="fs-1 opacity-75">
                  <i className="fas fa-female"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-plus-circle text-primary me-2"></i>
                Quick Actions
              </h5>
              <p className="card-text text-muted">
                Manage your students efficiently with these quick actions.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <a href="/students" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>
                  Add Student
                </a>
                <a href="/students" className="btn btn-outline-primary">
                  <i className="fas fa-list me-2"></i>
                  View All Students
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-chart-bar text-success me-2"></i>
                System Overview
              </h5>
              <p className="card-text text-muted">
                Your student management system is running smoothly.
              </p>
              <div className="row text-center">
                <div className="col-4">
                  <div className="border-end">
                    <div className="fs-4 text-primary">{stats.total}</div>
                    <small className="text-muted">Total</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-end">
                    <div className="fs-4 text-success">{stats.male}</div>
                    <small className="text-muted">Male</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="fs-4 text-info">{stats.female}</div>
                  <small className="text-muted">Female</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
