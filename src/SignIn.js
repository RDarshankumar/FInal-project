import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, Grid, Container, Avatar, CssBaseline, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; // Firebase configuration file
import { useNavigate } from 'react-router-dom';

// Theme configuration for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a66c2', // LinkedIn blue
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

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true); // Set success state to true
      navigate('/nav'); // Navigate to the Nav component on successful sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNavigateToSignUp = () => {
    navigate('/'); // Redirect to /signup
  };

  const handleCloseSnackbar = () => {
    setError(''); // Reset error message
    setSuccess(false); // Reset success state
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
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Consistent shadow for professional look
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* Linkup Pro branding */}
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome Back to Linkup Pro
          </Typography>
          <Typography component="h2" variant="subtitle1" gutterBottom>
            Sign in to continue!
          </Typography>
          <Box component="form" onSubmit={handleSignIn} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleNavigateToSignUp}>
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Snackbar for error/success messages */}
        <Snackbar
          open={Boolean(error) || success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error || 'Sign in successful!'}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
