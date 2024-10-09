import React, { useState } from 'react';
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
  Alert,
  CardActions
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WorkIcon from '@mui/icons-material/Work'; // Job icon
import { useSnackbar } from 'notistack';
import Image1 from './linkdun image/1.jpg';
import Image2 from './linkdun image/John-Christopoulos_headshot.jpg';
import Image3 from './linkdun image/John_Legend_2019_by_Glenn_Francis_(cropped).jpg';
import Image4 from './linkdun image/downloa.jpeg';
import Image5 from './linkdun image/john-lafontaine-752x752.jpg';
import './Post.css';

const initialPostsData = [];

const connectionsData = [
  { name: 'John Doe', image: Image1 },
  { name: 'Jane Smith', image: Image2 },
  { name: 'Michael Johnson', image: Image3 },
  { name: 'Emily Davis', image: Image4 },
  { name: 'David Wilson', image: Image5 },
];

function Agency() {
  const [activePostType, setActivePostType] = useState('all');
  const [posts, setPosts] = useState(initialPostsData);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostHeading, setNewPostHeading] = useState('');
  const [mediaUpload, setMediaUpload] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [followedConnections, setFollowedConnections] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [followersCount, setFollowersCount] = useState(1500);
  
  // New state for job post
  const [jobTitle, setJobTitle] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobSkills, setJobSkills] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handlePostTypeClick = (type) => {
    setActivePostType(type);
  };

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setOpenPopup(true);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
    // Reset job post fields if opening job popup
    if (type === 'job') {
      setJobTitle('');
      setJobSalary('');
      setJobSkills('');
    }
  };

  const handlePost = () => {
    const newPost = {
      type: popupType,
      content: popupType === 'job' ? `${jobTitle}, Salary: ${jobSalary}, Skills: ${jobSkills}` : newPostContent,
      heading: popupType === 'article' ? newPostHeading : '',
      media: mediaUpload || '',
    };
    setPosts([...posts, newPost]);
    setOpenPopup(false);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
    // Reset job post fields
    setJobTitle('');
    setJobSalary('');
    setJobSkills('');

    // Show success snackbar message
    setSnackbarMessage('Post created successfully!');
    setOpenSnackbar(true);
  };

  const handleLike = (index) => {
    setLikes({ ...likes, [index]: !likes[index] });
  };

  const handleAddComment = (index) => {
    if (commentInput[index]) {
      setComments({
        ...comments,
        [index]: [...(comments[index] || []), commentInput[index]],
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
    setSnackbarMessage('Post deleted successfully!');
    setOpenSnackbar(true);
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
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if ((popupType === 'video' && isVideo) || (popupType !== 'video' && isImage)) {
        setMediaUpload(URL.createObjectURL(file));
      } else {
        setSnackbarMessage('Invalid file type! Please upload a valid image or video.');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Container maxWidth={false} className="container" sx={{ width: '100%', padding: '0', marginTop: '10px' }}>
      <Grid container spacing={2}>
        {/* Left Side - Followers Card and Connections */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="typography" align="center">Followers</Typography>
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
              <IconButton onClick={() => handleOpenPopup('image')} className="icon-button"><ImageIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('video')} className="icon-button"><VideoLibraryIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('article')} className="icon-button"><ArticleIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('job')} className="icon-button"><WorkIcon /></IconButton> {/* Job icon */}
            </Box>
          </Box>

          <Box>
            {filteredPosts.map((post, index) => (
              <Card key={index} className="card" sx={{ mb: 2, boxShadow: 3 }}>
                {post.media && post.type === 'video' ? (
                  <video controls src={post.media} style={{ width: '100%', height: 'auto' }} />
                ) : (
                  post.media && <CardMedia component="img" image={post.media} alt="Post Media" />
                )}
                <CardContent>
                  <Typography variant="h6" component="div">{post.heading}</Typography>
                  <Typography variant="body1">{post.content}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton onClick={() => handleLike(index)}>
                    <ThumbUpIcon color={likes[index] ? 'primary' : 'inherit'} />
                  </IconButton>
                  <Typography variant="body2">{likes[index] ? 'Liked' : 'Like'}</Typography>
                  <IconButton onClick={() => handleAddComment(index)}>
                    <CommentIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShare(post.content)}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(index)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    value={commentInput[index] || ''}
                    onChange={(e) => handleCommentInputChange(index, e.target.value)}
                    size="small"
                    fullWidth
                  />
                </CardContent>
                <CardContent>
                  {comments[index] && comments[index].map((comment, commentIndex) => (
                    <Typography key={commentIndex} variant="body2" sx={{ pl: 2 }}>
                      {comment}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Popup Dialog for Creating Posts */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>{popupType.charAt(0).toUpperCase() + popupType.slice(1)} Post</DialogTitle>
        <DialogContent>
          {popupType === 'text' && (
            <TextField
              autoFocus
              margin="dense"
              label="Post Content"
              type="text"
              fullWidth
              variant="outlined"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          )}
          {popupType === 'image' && (
            <div>
              <input type="file" accept="image/*" onChange={handleMediaChange} />
            </div>
          )}
          {popupType === 'video' && (
            <div>
              <input type="file" accept="video/*" onChange={handleMediaChange} />
            </div>
          )}
          {popupType === 'article' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Article Title"
                type="text"
                fullWidth
                variant="outlined"
                value={newPostHeading}
                onChange={(e) => setNewPostHeading(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Article Content"
                type="text"
                fullWidth
                variant="outlined"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </>
          )}
          {popupType === 'job' && (
            <>
              <TextField
                margin="dense"
                label="Job Title"
                type="text"
                fullWidth
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Salary"
                type="text"
                fullWidth
                variant="outlined"
                value={jobSalary}
                onChange={(e) => setJobSalary(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Skills"
                type="text"
                fullWidth
                variant="outlined"
                value={jobSkills}
                onChange={(e) => setJobSkills(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Agency;
