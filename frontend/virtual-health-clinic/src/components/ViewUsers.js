import React, { useState, useEffect } from 'react';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend API
    const fetchUsers = async () => {
      const response = await fetch('http://128.199.31.193:8080/user/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h2>All Registered Users</h2>
      <div className="users-container">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Number:</strong> {user.number}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <div className="vaccination-status">
                <p>
                  <strong>COVID Vaccinated:</strong>
                  <span
                    className={`status ${user.covidVaccinated ? 'green' : 'red'}`}
                  >
                    {user.covidVaccinated ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <strong>Flu Vaccinated:</strong>
                  <span
                    className={`status ${user.fluVaccinated ? 'green' : 'red'}`}
                  >
                    {user.fluVaccinated ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <strong>Hepatitis B Vaccinated:</strong>
                  <span
                    className={`status ${user.hepatitisBVaccinated ? 'green' : 'red'}`}
                  >
                    {user.hepatitisBVaccinated ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <strong>Measles Vaccinated:</strong>
                  <span
                    className={`status ${user.measles ? 'green' : 'red'}`}
                  >
                    {user.measles ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <strong>Tuberculosis:</strong>
                  <span
                    className={`status ${user.tuberculosis ? 'green' : 'red'}`}
                  >
                    {user.tuberculosis ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <strong>Diabetes:</strong>
                  <span
                    className={`status ${user.diabetes ? 'green' : 'red'}`}
                  >
                    {user.diabetes ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
