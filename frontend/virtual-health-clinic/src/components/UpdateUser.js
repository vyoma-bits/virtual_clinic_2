import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateUser.css';

const UpdateUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [vaccinatedStatus, setVaccinatedStatus] = useState({
    covidVaccinated: false,
    fluVaccinated: false,
    hepatitisBVaccinated: false,
    measles: false,
    tuberculosis: false,
    diabetes: false,
  });

  const handleFetchUser = async () => {
    const response = await fetch(`https://clinic.codewithvyoma.ninja/user/user/${userId}`);
    if (response.ok) {
      const fetchedUser = await response.json();
      setUser(fetchedUser);
      setVaccinatedStatus({
        covidVaccinated: fetchedUser.covidVaccinated,
        fluVaccinated: fetchedUser.fluVaccinated,
        hepatitisBVaccinated: fetchedUser.hepatitisBVaccinated,
        measles: fetchedUser.measles,
        tuberculosis: fetchedUser.tuberculosis,
        diabetes: fetchedUser.diabetes,
      });
    } else {
      alert('User not found');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...vaccinatedStatus };

    const response = await fetch(`https://clinic.codewithvyoma.ninja/user/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      alert('User updated successfully!');
      navigate('/'); // Redirect back to the Admin page
    } else {
      alert('Error updating user');
    }
  };

  return (
    <div className="update-user-form">
      <h2>Update User Vaccination Status</h2>
      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="input-box"
      />
      <button onClick={handleFetchUser} className="fetch-button">Fetch User</button>

      {user && (
        <form onSubmit={handleUpdateUser} className="form">
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Number: {user.number}</p>
          <p>Address: {user.address}</p>

          <div className="vaccination-status">
            <h4>Vaccination Status:</h4>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.covidVaccinated}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, covidVaccinated: !prev.covidVaccinated }))}
                />
                COVID-19
                <span className={`status-indicator ${vaccinatedStatus.covidVaccinated ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.fluVaccinated}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, fluVaccinated: !prev.fluVaccinated }))}
                />
                Flu
                <span className={`status-indicator ${vaccinatedStatus.fluVaccinated ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.hepatitisBVaccinated}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, hepatitisBVaccinated: !prev.hepatitisBVaccinated }))}
                />
                Hepatitis B
                <span className={`status-indicator ${vaccinatedStatus.hepatitisBVaccinated ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.measles}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, measles: !prev.measles }))}
                />
                Measles
                <span className={`status-indicator ${vaccinatedStatus.measles ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.tuberculosis}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, tuberculosis: !prev.tuberculosis }))}
                />
                Tuberculosis
                <span className={`status-indicator ${vaccinatedStatus.tuberculosis ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={vaccinatedStatus.diabetes}
                  onChange={() => setVaccinatedStatus(prev => ({ ...prev, diabetes: !prev.diabetes }))}
                />
                Diabetes
                <span className={`status-indicator ${vaccinatedStatus.diabetes ? 'vaccinated' : 'not-vaccinated'}`}></span>
              </label>
            </div>
          </div>

          <button type="submit" className="primary-btn">Update User</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
