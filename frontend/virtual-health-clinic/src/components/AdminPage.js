import React, { useEffect, useState } from 'react';
import './Admin.css'; // Import the CSS for styling

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [vaccinationStatus, setVaccinationStatus] = useState({
    covidVaccinated: false,
    fluVaccinated: false,
    hepatitisBVaccinated: false,
    measles: false,
    tuberculosis: false,
    diabetes: false,
  });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('/user/users'); // Adjust the API endpoint if needed
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle user search by ID
  const handleUserSearch = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const response = await fetch(`/user/user/${userId}`);
      const user = await response.json();
      setSelectedUser(user);
      setVaccinationStatus({
        covidVaccinated: user.covidVaccinated,
        fluVaccinated: user.fluVaccinated,
        hepatitisBVaccinated: user.hepatitisBVaccinated,
        measles: user.measles,
        tuberculosis: user.tuberculosis,
        diabetes: user.diabetes,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // Update vaccination status for the selected user
  const handleUpdateVaccinationStatus = async (e) => {
    e.preventDefault();
    const updatedUser = { ...selectedUser, ...vaccinationStatus };

    try {
      await fetch('http://localhost:8080/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      alert('Vaccination status updated successfully!');
      fetchUsers(); // Refresh users after update
      setSelectedUser(null);
      setUserId(''); // Reset input field
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle checkbox change for vaccination status
  const handleVaccinationChange = (e) => {
    const { name, checked } = e.target;
    setVaccinationStatus((prevStatus) => ({
      ...prevStatus,
      [name]: checked,
    }));
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Virtual Health Clinic Admin Dashboard</h1>
        <div className="dashboard-stats">
          <h2>User Statistics</h2>
          <p>Total Users: {users.length}</p>
        </div>
      </header>

      <div className="add-user-button">
        <button onClick={() => window.location.href = '/add-user'}>Add User</button>
      </div>

      <section className="search-user">
        <h2>Update Vaccination Status</h2>
        <form onSubmit={handleUserSearch}>
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <button type="submit">Search User</button>
        </form>

        {selectedUser && (
          <form onSubmit={handleUpdateVaccinationStatus} className="vaccination-form">
            <h3>Vaccination Status for {selectedUser.name}</h3>
            <label>
              <input
                type="checkbox"
                name="covidVaccinated"
                checked={vaccinationStatus.covidVaccinated}
                onChange={handleVaccinationChange}
              />
              COVID Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                name="fluVaccinated"
                checked={vaccinationStatus.fluVaccinated}
                onChange={handleVaccinationChange}
              />
              Flu Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                name="hepatitisBVaccinated"
                checked={vaccinationStatus.hepatitisBVaccinated}
                onChange={handleVaccinationChange}
              />
              Hepatitis B Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                name="measles"
                checked={vaccinationStatus.measles}
                onChange={handleVaccinationChange}
              />
              Measles Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                name="tuberculosis"
                checked={vaccinationStatus.tuberculosis}
                onChange={handleVaccinationChange}
              />
              Tuberculosis Vaccinated
            </label>
            <label>
              <input
                type="checkbox"
                name="diabetes"
                checked={vaccinationStatus.diabetes}
                onChange={handleVaccinationChange}
              />
              Diabetes Checked
            </label>
            <button type="submit">Update Vaccination Status</button>
          </form>
        )}
      </section>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Virtual Health Clinic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Admin;
