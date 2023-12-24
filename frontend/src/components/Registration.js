import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Dashboard from './Dashboard';
import axios from 'axios';


export default function Form() {
    const navigate = useNavigate();
    // States for registration
    // const [userID, setName] = useState("");
    // const [password, setPassword] = useState("");
    // const [isOrg1, setIsOrg1] = useState(false);
    // const [isOrg2, setIsOrg2] = useState(false);
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');

    // // // States for checking the errors
    // const [submitted, setSubmitted] = useState(false);
    // const [error, setError] = useState(false);
 
  

    // Handling the form submission
    const handleSubmit = async(e) => {
      e.preventDefault();

        const isOrg1 = organization === 'Org1';
        const isOrg2 = organization === 'Org2';

        
        const response = await axios.post('http://localhost:3000/user/register', {
            isOrg1:true,
            isOrg2:false,
            isMinter: false, // Assuming this is a fixed value
            userID: name
        });
        // console.log('Registration Success:', response.data);

        if (name === 'admin') {
            navigate('/Dashboard', { state: { username: name, usertype: 'owner' } });
        } else {
            navigate('/Dashboard', { state: { username: name, usertype: 'user' } });
        }
            // Handle success (e.g., display a success message or redirect)
        
       
    };
 

    // // Showing success message
    // const successMessage = () => {
    //   const isOrg1 = organization === 'Org1';
    //   const isOrg2 = organization === 'Org2';
    //     return (
    //         <div
    //             className="success"
    //             style={{
    //                 display: submitted ? "" : "none",
    //             }}
    //         >
    //             <h1>{name} from {isOrg1 ? "Org 1" : "Org 2"} successfully registered!!</h1>
    //         </div>
    //     );
    // };
 
    // // // Showing error message if error is true
    // const errorMessage = () => {
    //     const isOrg1 = organization === 'Org1';
    //     const isOrg2 = organization === 'Org2';
    //     return (
    //         <div
    //             className="error"
    //             style={{
    //                 display: error ? "" : "none",
    //             }}
    //         >
    //             <h1>Please enter all the fields</h1>
    //         </div>
    //     );
    // };
 
    return (
      <div className="form">
        <div>
          <h1>User Registration</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Labels and inputs for form data */}
          <label className="label">Name</label>
          <input
                    type="text"
                    id="name"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
         
          
          <div className="select-container">
          <label htmlFor="organization">Organization:</label>
              <select
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
              >
                  <option value="">Select Organization</option>
                  <option value="Org1">Org1</option>
                  <option value="Org2">Org2</option>
              </select>
            
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
}

