import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
} from '@mui/material';
import Slider from 'react-slick';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Import WhatsApp Icon
import EmailIcon from '@mui/icons-material/Email'; // Import Email Icon
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery for responsive design
import config from '../config';

const PostComponent = ({ post }) => {
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/auth/user/${post.uid}`);
                const data = await response.json();
                setProfilePhoto(data.profilePhotoUrl);
                setWhatsapp(data.whatsappNumber);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchUser();
    }, [post.uid]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const postTypeStyles = {
        lost: {
            backgroundColor: '#ffe5e5', // Light red background
            color: '#d32f2f', // Red color for lost items
        },
        found: {
            backgroundColor: '#e8f5e9', // Light green background
            color: '#388e3c', // Green color for found items
        },
    };

    // Check if the screen is small (e.g., less than 600px)
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Card sx={{ margin: '20px 0', padding: '20px', ...postTypeStyles[post.postType] }}>
            {/* User Info */}
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar alt="User Avatar" src={profilePhoto} sx={{ width: 56, height: 56 }} />
                <Typography variant="h6" ml={2}>{post.userName}</Typography>
            </Box>

            {/* Post Info */}
            <CardContent>

                {/* Location and Item Type inline */}
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" sx={{ color: postTypeStyles[post.postType].color }}>
                        Location: {post.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: postTypeStyles[post.postType].color }}>
                        Type: {post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                    </Typography>
                </Box>

                <Typography variant="body1" mt={1}>{post.description}</Typography>

                {/* Image Carousel */}
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <Box mt={2}>
                        <Slider {...settings}>
                            {post.imageUrls.map((url, index) => (
                                <div key={index}>
                                    <img
                                        src={url}
                                        alt={`Post image ${index + 1}`}
                                        style={{
                                            width: '100%',               // Full width of the container
                                            height: '200px',             // Fixed height
                                            objectFit: 'contain',        // Contain to maintain aspect ratio
                                            borderRadius: '8px',         // Rounded corners
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Box>
                )}
            </CardContent>

            {/* Actions */}
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={() => console.log('Comment clicked')} fullWidth sx={{ marginRight: '10px', padding: '10px' }}>
                    Comments
                </Button>
                <Button
                    variant="contained"
                    color="success" // Green color for WhatsApp
                    startIcon={!isSmallScreen && <WhatsAppIcon />} // Show icon only on larger screens
                    onClick={() => window.open(`https://wa.me/${whatsapp}`, '_blank')}
                    fullWidth
                    sx={{
                        marginRight: '10px', // Spacing between buttons
                        padding: '10px', // Increased padding for better touch targets
                        '&:hover': {
                            backgroundColor: '#66bb6a', // Darker green on hover
                        },
                    }}
                >
                    {isSmallScreen ? <WhatsAppIcon /> : 'Message'} {/* Show icon only on small screens */}
                </Button>
                <Button
                    color="error" // Use the 'error' color to align with Gmail's red theme
                    variant="contained"
                    onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank')}
                    startIcon={!isSmallScreen && <EmailIcon />} // Show icon only on larger screens
                    fullWidth
                    sx={{
                        padding: '10px', // Increased padding for better touch targets
                        backgroundColor: '#d50000', // Gmail red color
                        '&:hover': {
                            backgroundColor: '#a00000', // Darker red on hover
                        },
                    }}
                >
                    {isSmallScreen ? <EmailIcon /> : 'Gmail'} {/* Show icon only on small screens */}
                </Button>
            </Box>
        </Card>
    );
};

export default PostComponent;
