import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useSnackbar } from 'notistack';
import Image1 from './linkdun image/1.jpg';
import Image2 from './linkdun image/John-Christopoulos_headshot.jpg';
import Image3 from './linkdun image/John_Legend_2019_by_Glenn_Francis_(cropped).jpg';
import Image4 from './linkdun image/downloa.jpeg';
import Image5 from './linkdun image/john-lafontaine-752x752.jpg';
import './Post.css';

const connectionsData = [
  { name: 'John Doe', image: Image1 },
  { name: 'Jane Smith', image: Image2 },
  { name: 'Michael Johnson', image: Image3 },
  { name: 'Emily Davis', image: Image4 },
  { name: 'David Wilson', image: Image5 },
];

function PostApp() {
  const [activePostType, setActivePostType] = useState('all');
  const [posts, setPosts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostHeading, setNewPostHeading] = useState('');
  const [mediaUpload, setMediaUpload] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [followedConnections, setFollowedConnections] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [followersCount, setFollowersCount] = useState(2000);

  const { enqueueSnackbar } = useSnackbar();

  // Load posts from local storage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
    setLikes(Array(savedPosts.length).fill(false)); // Initialize likes state
    setComments(Array(savedPosts.length).fill([])); // Initialize comments state
  }, []);

  // Save posts to local storage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostTypeClick = (type) => {
    setActivePostType(type);
  };

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setOpenPopup(true);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
  };

  const handlePost = () => {
    const newPost = {
      type: popupType,
      content: newPostContent,
      heading: popupType === 'article' ? newPostHeading : '',
      media: mediaUpload || '',
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setLikes((prevLikes) => [...prevLikes, false]); // Initialize likes for new post
    setComments((prevComments) => [...prevComments, []]); // Initialize comments for new post
    setOpenPopup(false);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
  };

  const handleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  const handleAddComment = (index) => {
    if (commentInput[index]) {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        newComments[index] = [...(newComments[index] || []), commentInput[index]];
        return newComments;
      });
      setCommentInput({ ...commentInput, [index]: '' });
    }
  };

  const handleCommentInputChange = (index, value) => {
    setCommentInput({ ...commentInput, [index]: value });
  };

  const handleDeletePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes.splice(index, 1); // Remove like state for the deleted post
      return newLikes;
    });
    setComments((prevComments) => {
      const newComments = [...prevComments];
      newComments.splice(index, 1); // Remove comments state for the deleted post
      return newComments;
    });
  };

  const handleShare = (postContent) => {
    navigator.clipboard.writeText(postContent)
      .then(() => {
        setSnackbarMessage('Link copied to clipboard!');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const handleFollow = (name) => {
    setFollowedConnections({ ...followedConnections, [name]: !followedConnections[name] });
    setSnackbarMessage(followedConnections[name] ? `${name} unfollowed` : `Now following ${name}`);
    setOpenSnackbar(true);
  };

  const filteredPosts = activePostType === 'all' ? posts : posts.filter(post => post.type === activePostType);

  // Media upload handling
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (popupType === 'video' && file && file.type.startsWith('video/')) {
      setMediaUpload(URL.createObjectURL(file));
    } else if (popupType !== 'video' && file && (file.type.startsWith('image/'))) {
      setMediaUpload(URL.createObjectURL(file));
    } else {
      setSnackbarMessage('Invalid file type! Please upload a valid image or video.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth={false} className="container" sx={{ width: '100%', padding: '0', marginTop: '10px' }}>
      <Grid container spacing={2}>
        {/* Left Side - Followers Card and Connections */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="typography" align="center">Connection</Typography>
              <Typography variant="h4" align="center" className="follower-count">{followersCount}</Typography>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="typography">Connections</Typography>
              {connectionsData.map((connection, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <img src={connection.image} alt={connection.name} style={{ borderRadius: '50%', width: 40, height: 40 }} />
                  <Typography variant="body1" sx={{ ml: 1 }}>{connection.name}</Typography>
                  <Button className="button" onClick={() => handleFollow(connection.name)} size="small">
                    {followedConnections[connection.name] ? 'Unfollow' : 'Follow'}
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Post Feed */}
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <TextField
              label="Write a Post"
              fullWidth
              onClick={() => handleOpenPopup('text')}
              variant="outlined"
              className="text-field"
              InputProps={{ readOnly: true }} // Make the TextField read-only
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <IconButton onClick={() => handleOpenPopup('image')}><ImageIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('video')}><VideoLibraryIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('article')}><ArticleIcon /></IconButton>
            </Box>
          </Box>

          {/* Post Cards */}
          {filteredPosts.map((post, index) => (
            <Card key={index} className="post-card">
              <CardContent>
                {post.type === 'text' && <Typography variant="h6">{post.content}</Typography>}
                {post.type === 'image' && <CardMedia component="img" height="140" image={post.media} alt="Post image" />}
                {post.type === 'video' && (
                  <CardMedia component="video" controls height="140">
                    <source src={post.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </CardMedia>
                )}
                {post.type === 'article' && (
                  <Box>
                    <Typography variant="h6">{post.heading}</Typography>
                    <Typography variant="body1">{post.content}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <IconButton onClick={() => handleLike(index)}>
                    <ThumbUpIcon color={likes[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton onClick={() => handleAddComment(index)}><CommentIcon /></IconButton>
                  <IconButton onClick={() => handleShare(post.content)}><ShareIcon /></IconButton>
                  <IconButton onClick={() => handleDeletePost(index)}><DeleteIcon /></IconButton>
                </Box>
                {comments[index]?.map((comment, commentIndex) => (
                  <Typography key={commentIndex} variant="body2" sx={{ mt: 1 }}>{comment}</Typography>
                ))}
                <TextField
                  variant="outlined"
                  placeholder="Add a comment..."
                  value={commentInput[index] || ''}
                  onChange={(e) => handleCommentInputChange(index, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(index)}
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Popup for New Post */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>{`Create a ${popupType}`}</DialogTitle>
        <DialogContent>
          {popupType === 'article' && (
            <TextField
              autoFocus
              margin="dense"
              label="Post Title"
              fullWidth
              value={newPostHeading}
              onChange={(e) => setNewPostHeading(e.target.value)}
            />
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Post Content"
            fullWidth
            multiline
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          {popupType === 'image' || popupType === 'video' ? (
            <>
              <input type="file" accept={popupType === 'video' ? 'video/*' : 'image/*'} onChange={handleMediaChange} />
              {mediaUpload && (
                <Box sx={{ mt: 2 }}>
                  {popupType === 'video' ? (
                    <video controls width="100%">
                      <source src={mediaUpload} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={mediaUpload} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
                  )}
                </Box>
              )}
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PostApp;
