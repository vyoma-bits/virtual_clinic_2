import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Connect.css'; // Optional: If you want to keep styles separate

const Connect = () => {
  const { roomId } = useParams(); // Get roomId from URL
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";

    script.onload = () => {
      console.log('VideoSDK script loaded successfully');

      const initMeeting = () => {
        if (meeting !== null) {
          alert("You are already in a meeting. Please end the current meeting before joining another.");
          return;
        }

        const config = {
          name: "Doctor",
          meetingId: roomId,
          apiKey: "b5817148-605e-44ec-b09c-b152f337a341", // Replace with your actual API key
          containerId: "videoContainer", // Display video in this container
          micEnabled: true, // Enable microphone
          webcamEnabled: true, // Enable webcam
          participantCanToggleSelfWebcam: true, // Allow participants to toggle webcam
          participantCanToggleSelfMic: true, // Allow participants to toggle mic
          screenShareEnabled: true, // Enable screen sharing
          chatEnabled: false, // Disable chat
        };

        const newMeeting = new window.VideoSDKMeeting();
        newMeeting.init(config);
        setMeeting(newMeeting);

        // Show the "Leave Meeting" button
        document.getElementById("leaveMeetingBtn").style.display = "inline";
      };

      const leaveMeeting = () => {
        if (meeting) {
          setLoading(true);
          document.getElementById("loader").style.display = "block";
          document.getElementById("waitMessage").style.display = "block";

          // Redirect after a delay
          setTimeout(() => {
            window.location.href = "home.html"; // Redirect to home page
          }, 2000);
        }
      };

      // Automatically start meeting if roomId is available
      if (roomId) {
        initMeeting();
      } else {
        alert("No room ID provided. Please enter a valid room ID.");
      }

      // Assign leaveMeeting to the button click
      document.getElementById("leaveMeetingBtn").onclick = leaveMeeting;
    };

    script.src = "https://sdk.videosdk.live/rtc-js-prebuilt/0.3.42/rtc-js-prebuilt.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on unmount
      if (meeting) {
        meeting.leave(); // Optionally leave meeting on unmount
      }
    };
  }, [meeting, roomId]); // Updated dependencies

  return (
    <div>
      <h1>Video Call App</h1>

      {/* Video Container */}
      <div id="videoContainer" style={{ width: '800px', height: '600px', border: '1px solid black', marginTop: '20px' }}></div>

      {/* Leave Meeting Button */}
      <div style={{ marginTop: '20px' }}>
        <button id="leaveMeetingBtn" style={{ display: 'none' }}>Leave Meeting</button>
      </div>

      {/* Loader and Wait Message */}
      <div id="waitMessage" style={{ display: loading ? 'block' : 'none', fontSize: '20px', color: '#333', textAlign: 'center', marginTop: '20px' }}>
        Please wait, redirecting...
      </div>
      <div className="loader" id="loader" style={{ display: loading ? 'block' : 'none', margin: '0 auto', width: '80px', height: '80px', border: '16px solid #f3f3f3', borderRadius: '50%', borderTop: '16px solid #3498db', animation: 'spin 2s linear infinite' }}></div>
    </div>
  );
};

export default Connect;
