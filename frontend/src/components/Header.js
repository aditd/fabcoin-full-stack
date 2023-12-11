import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
//import FabcoinWallet from './components/FabcoinWallet';
//import FabcoinTransaction from './components/FabcoinTransaction';
//import Registration from "./components/Registration"
const Navbar = () => {
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "black", color: "secondary"}}>
        <Toolbar>
          <Typography variant='h4' align="left" component="div" sx={{ flexGrow: 1 }}>FabCoin</Typography>

          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight: '50px' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/Dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight: '50px' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>

          <Button component={NavLink} to='/FabcoinWallet' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight: '50px' } }} sx={{ color: 'white', textTransform: 'none' }}>Wallet</Button>

          <Button component={NavLink} to='/FabcoinTransaction' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight: '50px' } }} sx={{ color: 'white', textTransform: 'none' }}>Spend</Button>

          <Button component={NavLink} to='/Registration' style={({ isActive }) => { return { backgroundColor: isActive ? '#094237' : '', marginRight: '50px' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Register</Button>

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;

//#6d1b7b