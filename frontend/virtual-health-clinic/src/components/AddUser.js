import React, { useState } from 'react';
import './AddUser.css';

const AddUser = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert id to an integer and number to an integer
    const newUser = { 
      id: Number(id), 
      name, 
      number: Number(number), 
      address 
    };

    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert('User added successfully!');
      setId('');
      setName('');
      setNumber('');
      setAddress('');
    } else {
      alert('Error adding user');
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="input-box"
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-box"
          />
        </div>

        <div className="form-group">
          <label>Number:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="input-box"
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input-box"
          />
        </div>

        <button type="submit" className="primary-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
