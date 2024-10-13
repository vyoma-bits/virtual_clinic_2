// src/SymptomChecker.js

import React, { useState } from 'react';
import axios from 'axios';
import './Symptom.css';

const SymptomChecker = () => {
    const [fever, setFever] = useState('No');
    const [cough, setCough] = useState('No');
    const [fatigue, setFatigue] = useState('No');
    const [difficultyBreathing, setDifficultyBreathing] = useState('No');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [cholesterolLevel, setCholesterolLevel] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (age <= 0) {
            setResult('Please enter a valid age.');
            return;
        }

        const symptoms = {
            'Fever': fever,
            'Cough': cough,
            'Fatigue': fatigue,
            'Difficulty Breathing': difficultyBreathing,
            'Age': age,
            'Gender': gender,
            'Blood Pressure': bloodPressure,
            'Cholesterol Level': cholesterolLevel,
        };

        try {
            const response = await axios.post('http://128.199.31.193:5000/check-symptoms', symptoms);
            setResult(`Predicted Disease: ${response.data['Predicted Disease']}`);
        } catch (error) {
            console.error("There was an error checking the symptoms!", error);
            setResult('Error checking symptoms. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Symptom Checker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Fever:
                        <select value={fever} onChange={(e) => setFever(e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Cough:
                        <select value={cough} onChange={(e) => setCough(e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Fatigue:
                        <select value={fatigue} onChange={(e) => setFatigue(e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Difficulty Breathing:
                        <select value={difficultyBreathing} onChange={(e) => setDifficultyBreathing(e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Gender:
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Blood Pressure:
                        <select value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Low">Low</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Cholesterol Level:
                        <select value={cholesterolLevel} onChange={(e) => setCholesterolLevel(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Check Symptoms</button>
            </form>
            {result && <h2>{result}</h2>}
        </div>
    );
};

export default SymptomChecker;
