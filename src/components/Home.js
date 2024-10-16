import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, Container } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Handle menu open
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle logout
    const handleLogout = () => {
        // Clear localStorage tokens
        localStorage.removeItem('authToken');
        localStorage.removeItem('uid');
        
        // Close the menu and redirect to login page
        setAnchorEl(null);
        navigate('/login');
    };

    // Handle Edit Profile (We will implement this later)
    const handleEditProfile = () => {
        setAnchorEl(null);
        // Navigate to Edit Profile page (to be implemented later)
        navigate('/profile');
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                <Typography variant="h5">Welcome to the Home Page</Typography>

                {/* Account Circle Icon for Profile/Logout */}
                <IconButton onClick={handleMenuOpen} size="large" edge="end" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <AccountCircle style={{ fontSize: 40 }} />
                </IconButton>

                {/* Dropdown Menu for Profile and Logout */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </Container>
    );
};

export default Home;
