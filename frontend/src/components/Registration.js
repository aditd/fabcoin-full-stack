import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Dashboard from './Dashboard';
 
export default function Form() {
    const navigate = useNavigate();
    // States for registration
    const [userID, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isOrg1, setIsOrg1] = useState(false);
    const [isOrg2, setIsOrg2] = useState(false);
 
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
 
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
 
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleOrg1Change = () => {
        setIsOrg1(!isOrg1);
        setSubmitted(false);
      };
    
      const handleOrg2Change = () => {
        setIsOrg2(!isOrg2);
        setSubmitted(false);
      };
  

    // Handling the form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (userID === "" || password === ""|| (!isOrg1 && !isOrg2)) {
            setError(true);
        } 
        else{
            setSubmitted(true);
            setError(false);
            // Redirect based on the access type
            //if (userID === "admin") {
            //    navigate('/Dashboard', {state: {usertype: 'owner'}});
            //} else {
            //    navigate('/Dashboard', {state: {usertype: 'user'}});
            //}
            // Send registration data to the backend
            try {
                const response = await fetch('http://localhost:3000/user/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ isOrg1, isOrg2, userID }),
                });

                const data = await response.json();
                console.log('Server Response:', data);

                // Redirect based on the access type
                if (userID === 'admin') {
                    navigate('/Dashboard', { state: { usertype: 'owner' } });
                } else {
                    navigate('/Dashboard', { state: { usertype: 'user' } });
                }
            } catch (error) {
                console.error('Error submitting registration:', error);
            }
        }
    };
 

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>{userID} from {isOrg1 ? "Org 1" : "Org 2"} successfully registered!!</h1>
            </div>
        );
    };
 
    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };
 
    return (
      <div className="form">
        <div>
          <h1>User Registration</h1>
        </div>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={userID}
            type="text"
          />

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />
          
          <div className="select-container">
            <label className="label">Choose your organization?</label>
            <label className="label">
              <input
                type="checkbox"
                checked={isOrg1}
                onChange={handleOrg1Change}
              />
              Org 1
            </label>

            <label className="label">
              <input
                type="checkbox"
                checked={isOrg2}
                onChange={handleOrg2Change}
              />
              Org 2
            </label>
          </div>

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
}

