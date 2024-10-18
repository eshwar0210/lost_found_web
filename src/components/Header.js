import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, Toolbar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const navigate = useNavigate();

    // Fetch user details by UID from localStorage
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        if (uid) {
            // Replace the URL with your API endpoint to get user details by uid
            axios.get(`${process.env.REACT_APP_BASE_URL}/auth/user/${uid}`)
                .then((response) => {
                    // console.log(response.data);
                    const { name, profilePhotoUrl } = response.data;
                    setName(name);
                    setProfilePhoto(profilePhotoUrl);
                    // Set the user's name in localStorage
                    localStorage.setItem('name', name);
                    localStorage.setItem('profile', profilePhotoUrl);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);

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
        localStorage.removeItem('name');
        localStorage.removeItem('profile');
        setAnchorEl(null);
        navigate('/login');
    };

    // Handle Edit Profile
    const handleEditProfile = () => {
        setAnchorEl(null);
        navigate('/editprofile');
    };
    const handlehomeclick = () => {
        setAnchorEl(null);
        navigate('/home');
    };

    const handlemyprofileclick = () =>{
        setAnchorEl(null);
        navigate('/myprofile');
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
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: 'blue',
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
                    {profilePhoto ? (
                        <Avatar src={profilePhoto} alt={name} style={{ width: 40, height: 40 }} />
                    ) : (
                        <Avatar>{name.charAt(0)}</Avatar> // Fallback if profileImage is missing
                    )}
                </IconButton>

                {/* Dropdown Menu for Profile and Logout */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom', // Aligns the menu below the avatar
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top', // Makes the menu dropdown appear from the top of its anchor
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handlehomeclick}>Home </MenuItem>   
                    <MenuItem onClick={handlemyprofileclick}>My Posts</MenuItem>
                    
                    <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                    
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

            </Toolbar>
        </Box>
    );
};

export default Header;
