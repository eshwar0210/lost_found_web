import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the items vertically
                
                padding: '16px',
                marginTop: 'auto',
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '800px' }, // Responsive maxWidth for footer
                marginLeft: 'auto', // Center horizontally
                marginRight: 'auto', // Center horizontally
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                Designed with ❤️ by Eshwar
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {'© '}
                <Link color="inherit" href="https://yourwebsite.com">
                    Lost Found
                </Link>{' '}
                {new Date().getFullYear()}
                {'. All rights reserved.'}
            </Typography>
        </Box>
    );
};

export default Footer;
