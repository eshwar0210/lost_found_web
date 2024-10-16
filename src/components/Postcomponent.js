import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    IconButton,
    Collapse,
} from '@mui/material';
import Slider from 'react-slick';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // For the expand/collapse button
import { useMediaQuery } from '@mui/material';
import config from '../config';

const PostComponent = ({ post }) => {
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [comments, setComments] = useState([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [showComments, setShowComments] = useState(false); // State to toggle comments visibility
    const [commentLoading, setCommentLoading] = useState(false); // Loading state for comment submission

    console.log(post);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/auth/user/${post.uid}`);
                const data = await response.json();
                setProfilePhoto(data.profilePhotoUrl);
                setWhatsapp(data.whatsappNumber);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [post.uid]);

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return; // Prevent empty comments
        setCommentLoading(true);

        // Here you can integrate your backend API to save comments

        setComments([...comments, newComment]); // Add new comment to the list
        setNewComment(''); // Clear the input field
        setCommentLoading(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const postTypeStyles = {
        lost: {
            backgroundColor: '#ffe5e5',
            color: '#d32f2f',
        },
        found: {
            backgroundColor: '#e8f5e9',
            color: '#388e3c',
        },
    };

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
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'contain',
                                            borderRadius: '8px',
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
                <Button
                    variant="outlined"
                    onClick={() => setShowComments(!showComments)}
                    fullWidth
                    sx={{
                        marginRight: '10px', padding: '10px',
                        fontSize: '0.775rem',
                    }}
                    endIcon={<ExpandMoreIcon />}
                >
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={!isSmallScreen && <WhatsAppIcon />}
                    onClick={() => window.open(`https://wa.me/${whatsapp}`, '_blank')}
                    fullWidth
                    sx={{
                        marginRight: '10px',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: '#66bb6a',
                        },
                    }}
                >
                    {isSmallScreen ? <WhatsAppIcon /> : 'Message'}
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank')}
                    startIcon={!isSmallScreen && <EmailIcon />}
                    fullWidth
                    sx={{
                        padding: '10px',
                        backgroundColor: '#d50000',
                        '&:hover': {
                            backgroundColor: '#a00000',
                        },
                    }}
                >
                    {isSmallScreen ? <EmailIcon /> : 'Gmail'}
                </Button>
            </Box>

            {/* Comments Section */}
            <Collapse in={showComments}>
                <Box mt={2} >
                    {comments.length === 0 ? (
                        <Typography variant="body2">No comments yet.</Typography>
                    ) : (
                        comments.map((comment, index) => (
                            <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                                {comment}
                            </Typography>
                        ))
                    )}
                </Box>
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }} // Stack on small screens, row on larger
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        marginTop: 1,
                        gap: { xs: 1, sm: 2 }, // Space between input and button
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Add a comment..."
                        fullWidth
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={commentLoading}
                        sx={{
                            borderRadius: '20px', // Rounded corners for the input field
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px', // Ensuring consistent rounding
                            },
                        }}
                    />
                    {newComment.trim() && ( // Render button only if there's actual text
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            disabled={commentLoading}
                            sx={{
                                borderRadius: '20px', // Rounded corners for the button
                                padding: '10px 20px', // Adjust padding as needed
                                minWidth: '100px' // Minimum width for the button
                            }}
                        >
                            {commentLoading ? 'Adding...' : 'Comment'}
                        </Button>
                    )}
                </Box>

            </Collapse>
        </Card>
    );
};

export default PostComponent;
