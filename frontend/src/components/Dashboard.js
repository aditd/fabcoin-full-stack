import React from 'react';
//import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation
//import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {Button} from '@mui/material';

const Dashboard = () => {
//    const { userType } = useParams();
    const location = useLocation();
  const handleMint = () => {
    // Logic for minting money (applicable to the owner)
    console.log('Minting money...');
  };

  const handleSpend = () => {
    // Logic for spending money (applicable to both owner and user)
    console.log('Spending money...');
  };

  return (
    <div>
      <h2>
        {location.state.usertype === "owner"
          ? "Owner Dashboard"
          : (location.state.usertype === null ?"Go register first":"User Dashboard")}
      </h2>
      {location.state.usertype === "owner" ? (
        <>
          <Button onClick={handleMint} variant= "contained" component={NavLink} to='/MintToken' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight:'50px'} }} sx={{ color: 'black', textTransform: 'none' }}>
            Mint Money
          </Button>
          <Button onClick={handleSpend} variant= "contained" component={NavLink} to='/FabcoinTransaction' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight:'50px'} }} sx={{ color: 'black', textTransform: 'none' }}>
            Spend Money
          </Button>
          <Button onClick={handleSpend} variant= "contained" component={NavLink} to='/TransactionList' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight:'50px'} }} sx={{ color: 'black', textTransform: 'none' }}>
            View Transactions
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSpend} variant= "contained" component={NavLink} to='/FabcoinTransaction' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight:'50px'} }} sx={{ color: 'black', textTransform: 'none' }}>
            Spend Money
          </Button>
          <Button onClick={handleSpend} variant= "contained" component={NavLink} to='/TransactionList' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight:'50px'} }} sx={{ color: 'black', textTransform: 'none' }}>
            View Transactions
          </Button>
        </>
      )}
    </div>
  );
};

export default Dashboard;