import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Dashboard from './Dashboard';
 
export default function Form() {
    const navigate = useNavigate();
    // States for registration
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState("");
 
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
  
    // Handling the access change
    const handleAccess = (e) => {
        setAccess(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || password === ""|| access === "") {
            setError(true);
        } 
        else{
            setSubmitted(true);
            setError(false);
            // Redirect based on the access type
            if (access === "owner") {
                navigate('/Dashboard', {state: {usertype: 'owner'}});
            } else if (access === "user") {
                navigate('/Dashboard', {state: {usertype: 'user'}});
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
                <h1>{access} {name} successfully registered!!</h1>
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
                    value={name}
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
                <select className="select-dropdown" value={access} onChange={handleAccess}>
                    <option value="">-- Select --</option>
                    <option value="owner">Org 1</option>
                    <option value="user">Org 2</option>
                </select>
                </div>
                
 
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

//<label className="label">Choose your organization?
//                <select value={access} onChange={handleAccess}>
//                <option value="">-- Select --</option>
//               <option value="owner">Org 1</option>
//                <option value="user">Org 2</option>
//                </select>
//                </label>