import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    Collapse,
    CircularProgress, // Added for loading state
    Divider, // Added for separating comments section
} from '@mui/material';
import Slider from 'react-slick';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import config from '../config';

const PostComponent = ({ post }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for user data

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/auth/user/${post.uid}`);
                const data = await response.json();
                setProfilePhoto(data.profilePhotoUrl);
                setWhatsapp(data.whatsappNumber);
                setEmail(data.email);
                setName(data.name);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoadingUser(false); // Set loading to false after fetching
            }
        };

        fetchUser();
    }, [post.uid]);

    useEffect(() => {
        setComments(post.comments || []);
    }, [post.comments]);

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;

        setCommentLoading(true);

        const userId = localStorage.getItem('uid');
        const userName = localStorage.getItem('name');

        const newCommentObj = {
            userId,
            userName,
            comment: newComment,
        };

        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment('');

        try {
            const response = await fetch(`${config.BASE_URL}/post/${post._id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentObj),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            setComments((prevComments) => prevComments.slice(0, -1)); // Revert optimistic update
        } finally {
            setCommentLoading(false);
        }
    };

    const settings = {
        dots: true,
        infinite: post.imageUrls.length > 1,
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
            {loadingUser ? ( // Show loading spinner while fetching user data
                <CircularProgress />
            ) : (
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar alt="User Avatar" src={profilePhoto} sx={{ width: 56, height: 56 }} />
                    <Typography variant="h6" ml={2}>{name}</Typography>
                </Box>
            )}

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
                    sx={{ marginRight: '10px', padding: '10px', fontSize: '0.775rem' }}
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
                        '&:hover': { backgroundColor: '#66bb6a' },
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
                        '&:hover': { backgroundColor: '#a00000' },
                    }}
                >
                    {isSmallScreen ? <EmailIcon /> : 'Gmail'}
                </Button>
            </Box>

            {/* Comments Section */}
            <Collapse in={showComments}>
                <Box mt={2}>
                    <Typography variant="body2">{comments.length > 0 ? `${comments.length} Comments` : 'No comments yet.'}</Typography>
                    <Divider sx={{ marginY: 1 }} />
                    {comments.map((comment, index) => (
                        <Box key={index} display="flex" mb={2}>
                            <Typography variant="body2" fontWeight="bold" fontSize={15} mr={2}>
                                {comment.userName}:
                            </Typography>
                            <Typography fontSize={15}>{comment.comment}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        marginTop: 1,
                        gap: { xs: 1, sm: 2 },
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentSubmit}
                        disabled={commentLoading}
                    >
                        {commentLoading ? <CircularProgress size={24} /> : 'Add'}
                    </Button>
                </Box>
            </Collapse>
        </Card>
    );
};

export default PostComponent;
