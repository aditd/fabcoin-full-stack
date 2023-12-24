import React from "react";
//import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation
//import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import MintComponent from './MintComponent';
import GetTransactions from './TransactionsComponent';
import SpendUTXOsComponent from './SpendUTXOsComponent';
import GetUsers from './GetUsers';


const Dashboard = () => {
    const location = useLocation();
    const { username, usertype } = location.state || {};
	
	return (
        <div className="dashboard">
            <h1>Welcome, {username}</h1>
			
            {usertype === 'owner' && username === 'admin' && <MintComponent username={username} />}
			<SpendUTXOsComponent username={username} />
            <GetTransactions username={username} />
			<GetUsers username={username} />
        </div>
    );
};


export default Dashboard;
