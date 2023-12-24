import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const GetUsers = () => {
    const location = useLocation();
    const username = location.state?.username;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post('http://localhost:3000/user/get-users/', {
                        isOrg1: true,
                        isOrg2: false,
                        isMinter: false,
                        userID: username
                    }
                );

                const dataString = response.data.data;
                console.log(dataString)
                const splitData = dataString.replace(/"/g, '').split(',');
                setUsers(splitData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {users}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default GetUsers;
