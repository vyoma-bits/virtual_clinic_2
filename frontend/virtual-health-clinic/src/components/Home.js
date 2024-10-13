import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './Home.css'; // Import your custom CSS

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from the URL

  const handleConnect = () => {
    navigate('/doctors');
  };

  const handleSymptomCheck = () => {
    navigate('/symptom-checker'); // Adjust this route to your symptom checker page
  };

  const handleProfile = () => {
    navigate(`/profile/${userId}`); // Pass userId to the profile page
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Doctor Consultation Portal</h1>
      <div className="button-container">
        <button className="btn-connect" onClick={handleConnect}>
          Connect to a Doctor
        </button>
        <button className="btn-symptom-check" onClick={handleSymptomCheck}>
          Check Symptoms
        </button>
        <button className="btn-profile" onClick={handleProfile}>
          My Profile
        </button>
      </div>
    </div>
  );
};

export default Home;
