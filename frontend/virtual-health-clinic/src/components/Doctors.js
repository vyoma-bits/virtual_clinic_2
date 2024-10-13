import React from 'react';
import axios from 'axios';
import './Doctors.css';

const Doctors = () => {
  const handleConnect = async (roomId, doctorName) => {
    const emailData = {
      fromEmail: "kalravyoma9@gmail.com", // Replace with your email
      fromName: "Vyoma Kalra", // Replace with your name
      toEmail: "kalravyoma10@gmail.com", // Recipient email
      toName: doctorName,
      subject: "Meeting Request",
      textPart: `A patient has requested you to join the meeting. Please check the link below.`,
      htmlPart: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 20px auto;
              }
              h1 {
                color: #3498db;
                text-align: center;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
                margin: 10px 0;
              }
              .button {
                display: inline-block;
                padding: 10px 15px;
                background-color: #3498db;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #888888;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Patient Meeting Request</h1>
              <p>Dear ${doctorName},</p>
              <p>A patient has requested you to join a meeting with them. Please click the link below to join the meeting:</p>
              <a href="http://127.0.0.1:5500/index.html?roomId=${roomId}" class="button">Join Meeting</a>
              <p>Thank you!</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply.</p>
            </div>
          </body>
        </html>
      `,
    };

    try {
      const response = await axios.post("http://localhost:8080/user/send-email", emailData);
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    window.location.href = `http://127.0.0.1:5500/index.html?roomId=${roomId}`;
  };

  const doctors = [
    {
      id: '5',
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
      img: 'https://thumbnails.yayimages.com/1600/1/7f7/17f724e.jpg',
      experience: '10 years of experience in treating heart diseases and conditions.',
      qualifications: 'MBBS, MD (Cardiology)',
      location: 'City Hospital, New York',
    },
    {
      id: '6',
      name: 'Dr. Jane Smith',
      specialty: 'Neurology',
      img: 'https://th.bing.com/th/id/R.215c1ff399e961851cc11a7810886a0e?rik=oZfxvnavGwz6cA&riu=http%3a%2f%2fwww.writergirl.com%2fwp-content%2fuploads%2f2014%2f11%2fDoctor-790X1024.jpg&ehk=CmnYm47Si7SLogCKQcVQ9Onueou53ycpcjvFFc3Ej00%3d&risl=&pid=ImgRaw&r=0',
      experience: '8 years of experience in treating neurological disorders.',
      qualifications: 'MBBS, MD (Neurology)',
      location: 'Neuro Clinic, Los Angeles',
    },
    {
      id: '7',
      name: 'Dr. Emily Carter',
      specialty: 'Pediatrics',
      img: 'https://wallpapers.com/images/hd/doctor-pictures-l5y1qs2998u7rf0x.jpg',
      experience: '5 years of experience in pediatric care.',
      qualifications: 'MBBS, DCH',
      location: 'Children\'s Hospital, San Francisco',
    },
    {
      id: '8',
      name: 'Dr. Michael Brown',
      specialty: 'Dermatology',
      img: 'https://thumbnails.yayimages.com/1600/1/7f7/17f724e.jpg',
      experience: '12 years of experience in skin care and treatment.',
      qualifications: 'MBBS, MD (Dermatology)',
      location: 'Dermatology Center, Chicago',
    },
    {
      id: '9',
      name: 'Dr. Lisa White',
      specialty: 'Orthopedics',
      img: 'https://th.bing.com/th/id/R.215c1ff399e961851cc11a7810886a0e?rik=oZfxvnavGwz6cA&riu=http%3a%2f%2fwww.writergirl.com%2fwp-content%2fuploads%2f2014%2f11%2fDoctor-790X1024.jpg&ehk=CmnYm47Si7SLogCKQcVQ9Onueou53ycpcjvFFc3Ej00%3d&risl=&pid=ImgRaw&r=0',
      experience: '15 years of experience in orthopedic surgery.',
      qualifications: 'MBBS, MS (Orthopedics)',
      location: 'City Hospital, Miami',
    },
  ];

  return (
    <div className="doctors-container">
      <h1>Select a Doctor</h1>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.img} alt={doctor.name} className="doctor-img" />
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <p className="doctor-experience">{doctor.experience}</p>
            <p className="doctor-qualifications">{doctor.qualifications}</p>
            <p className="doctor-location">{doctor.location}</p>
            <button className="connect-button" onClick={() => handleConnect(doctor.id, doctor.name)}>
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
