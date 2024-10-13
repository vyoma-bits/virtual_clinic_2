import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch total number of users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('https://clinic.codewithvyoma.ninja/user/users');
        const data = await response.json();
        setTotalUsers(data.length);  // Assuming it returns an array of users
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
    fetchTotalUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Statistics section */}
      <div className="dashboard-stats">
        <h2>Welcome to the Virtual Health Clinic</h2>
        <p>Total Registered Users: <strong>{totalUsers}</strong></p>
      </div>

      {/* Add User button */}
      <div className="add-user-section">
        <h3>Manage Users</h3>
        <Link to="/add-user">
          <button className="primary-btn">Add New User</button>
        </Link>
      </div>
      <nav>
        <ul>
          
          <li>
            <Link to="/users">
              <button className="view-users-btn">View Users</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Update User vaccination status */}
      <div className="update-user-section">
        <h3>Update Vaccination Status</h3>
        <Link to="/update">
          <button className="primary-btn">Update User</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
