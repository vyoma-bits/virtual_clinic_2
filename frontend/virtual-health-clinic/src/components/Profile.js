import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './Profile.css'; // Import your CSS for styling

const Profile = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://clinic.codewithvyoma.ninja/user/user/user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Phone Number: {user.number}</p>
        <p>Address: {user.address}</p>
      </div>
      <div className="vaccination-status">
        <h3>Vaccination Status</h3>
        <VaccinationCard title="COVID-19" vaccinated={user.covidVaccinated} />
        <VaccinationCard title="Flu" vaccinated={user.fluVaccinated} />
        <VaccinationCard title="Hepatitis B" vaccinated={user.hepatitisBVaccinated} />
        <VaccinationCard title="Measles" vaccinated={user.measles} />
        <VaccinationCard title="Tuberculosis" vaccinated={user.tuberculosis} />
        <VaccinationCard title="Diabetes" vaccinated={user.diabetes} />
      </div>
    </div>
  );
};

const VaccinationCard = ({ title, vaccinated }) => {
  return (
    <div className={`vaccination-card ${vaccinated ? 'vaccinated' : 'not-vaccinated'}`}>
      <h4>{title}</h4>
      <div className="status-indicator"></div>
      <p>{vaccinated ? 'Vaccinated' : 'Not Vaccinated'}</p>
    </div>
  );
};

export default Profile;
