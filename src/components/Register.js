import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem ,Link} from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hostel, setHostel] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const hostels = ['Kalam', 'C.V. Raman', 'Aryabatta', 'Asima'];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            whatsapp,
            password,
            confirmPassword,
            hostel,
            profilePhoto,
        });
        // Handle registration logic here
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '500px',
                margin: 'auto',
                marginTop: 8, // Increased top margin for better spacing
            }}
            mb={{ xs: 4, sm: 6 }}
        >
            <Typography variant="h4" component="h1" align="center">Register</Typography>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="WhatsApp Number"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <TextField
                select
                label="Hostel"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                required
            >
                {hostels.map((hostel) => (
                    <MenuItem key={hostel} value={hostel}>
                        {hostel}
                    </MenuItem>
                ))}
            </TextField>

            {/* Profile Photo Input */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginBottom: 2 }}>
                <Typography variant="body1" component="label" sx={{ display: 'block', marginBottom: '8px' }}>
                    Upload Profile Photo (Optional)
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                    style={{
                        display: 'none', // Hide the default file input
                    }}
                    id="profile-photo-upload"
                />
                <label htmlFor="profile-photo-upload">
                    <Box
                        sx={{
                            border: '2px dashed #3f51b5',
                            padding: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f0f0f0',
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '100%', // Make it full width
                            maxWidth: '320px', // Limit the maximum width for responsiveness
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        Click or drag to upload
                    </Box>
                </label>
                <Typography variant="caption" color="textSecondary">
                    Supported formats: .jpg, .png, .jpeg
                </Typography>
            </Box>

            <Button type="submit" variant="contained">Register</Button>

            <Box mt={2}>
                <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <Link href="/login" color="primary">
                        Login here
                    </Link>
                </Typography>
            </Box>

        </Box>
    );
};

export default Register;
