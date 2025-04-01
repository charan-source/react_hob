import React, { useState } from 'react';
import { 
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
//   Link,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.png'; // Adjust the path to your logo

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Static credentials for demo purposes
  const STATIC_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'password123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
  
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    // Static authentication check
    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
        onLogin(); 
      // Store a dummy token in session storage
      sessionStorage.setItem('token', 'dummy-auth-token');
       
      navigate('/');
 

    } else {
      setError('Invalid credentials. Use admin@example.com / password123');
    }
  };

  return (
    <Container 
      maxWidth="lg"
      sx={{
        height: '95vh',
        display: 'flex',
        alignItems: 'center',
        // py: 4
      }}
    >
      <Grid 
        container
        sx={{
          height: isMobile ? 'auto' : '80vh',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          marginTop: isMobile ? "30px" : 0,
        }}
      >
        {/* Left Column - Login Form */}
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{
            p: isMobile ? 3 : 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              mx: 'auto',
              width: '100%'
            }}
          >
            <Box textAlign="center" mb={5}>
              <img 
                src={Logo}
                alt="logo"
                style={{ width: 360 }}
              />
              {/* <Typography 
                variant="h5" 
                component="h4"
                mt={1}
                mb={3}
                pb={0.5}
              >
                We are The Lotus Team
              </Typography> */}
            </Box>

            <Typography variant="body1" mb={1}>
              Please login to your account
            </Typography>

            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email address"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box textAlign="center" pt={1} mb={2} pb={1}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
            
                  type="submit"
                  sx={{
                   
                    mb: 3,
                    fontWeight:"bold",
                    background: 'linear-gradient(to right, #0A0A3D, #1C1C6B, #2E2E9F, #5050D4, #5050D4)',
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(to right, #0A0A3D, #1C1C6B, #2E2E9F, #5050D4, #5050D4)',
                    }
                  }}
                >
                  Sign in
                </Button>
                {/* <Link href="#" color="text.secondary" underline="hover">
                  Forgot password?
                </Link> */}
              </Box>
            </form>

            {/* <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              pb={3}
              mb={2}
            >
              <Typography variant="body2" mr={1}>
                Don't have an account?
              </Typography>
              <Button variant="outlined" color="error">
                Register
              </Button>
            </Box> */}
          </Box>
        </Grid>

        {/* Right Column - Gradient Content */}
        <Grid 
  item 
  xs={12} 
  md={6}
  sx={{
    p: isMobile ? 3 : 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #0A0A3D, #1C1C6B, #2E2E9F, #5050D4, #5050D4)',
    color: 'white',
    textAlign: isMobile ? 'center' : 'left'
  }}
>
        
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" component="h4" mb={3}>
              We are more than just a company
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;