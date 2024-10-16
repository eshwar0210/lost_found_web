import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, Toolbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('uid');
        setAnchorEl(null);
        navigate('/login');
    };

    // Handle Edit Profile
    const handleEditProfile = () => {
        setAnchorEl(null);
        navigate('/profile');
    };

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    paddingX: 2,
                }}
            >
                {/* Logo/Brand with Hover Effect */}
                <Typography
                    variant="h6"
                    onClick={() => navigate('/')}
                    sx={{
                        cursor: 'pointer',
                        transition: 'color 0.3s', // Smooth transition for hover
                        '&:hover': {
                            color: 'blue', // Change to the desired hover color
                        },
                    }}
                >
                    Lost and Found
                </Typography>

                {/* Account Circle Icon for Profile/Logout */}
                <IconButton
                    onClick={handleMenuOpen}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
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
            </Toolbar>
        </Box>
    );
};

export default Header;
