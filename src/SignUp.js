import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, Grid, Container, Avatar, CssBaseline, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase'; // Firebase config file
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a66c2',
    },
    background: {
      default: '#f4f4f9',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: 5,
        },
      },
    },
  },
});

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // Snackbar state
  const [message, setMessage] = useState(''); // Snackbar message

  const navigate = useNavigate(); // Use navigate hook to redirect

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Sign up successful'); // Set success message
      setOpen(true); // Open Snackbar
      navigate('/signin'); // Redirect to /signin
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage('Google Sign in successful'); // Set success message
      setOpen(true); // Open Snackbar
      navigate('/signin'); // Redirect to /signin
    } catch (err) {
      setError(err.message);
    }
  };

  // Navigate to Sign-In page
  const handleNavigateToSignIn = () => {
    navigate('/signin'); // Redirect to /signin
  };

  // Handle Enter key press for sign up
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome to Linkup Pro
          </Typography>
          <Typography component="h2" variant="subtitle1" gutterBottom>
            Sign up to start connecting!
          </Typography>
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2 }} onKeyPress={handleKeyPress}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Google Sign-In Button */}
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up with Google
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleNavigateToSignIn}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        {/* Snackbar for success message */}
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message={message}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
