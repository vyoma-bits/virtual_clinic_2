import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage'; // Assuming this component exists
import Admin from './components/Admin';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import ViewUsers from './components/ViewUsers';
import Home from './components/Home';
import Doctors from './components/Doctors';
import VideoCall from './components/Connect';
import SymptomChecker from './components/SymptomChecker';
import Profile from './components/Profile';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update" element={<UpdateUser />} /> {/* Corrected here */}
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route  path="/login" element={<LoginPage />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/connect/:roomId" element={<VideoCall />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />

      </Routes>
    </Router>
  );
}

export default App;
