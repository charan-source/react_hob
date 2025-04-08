import React, { useState } from 'react';
import { 
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.png';

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const STATIC_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'password123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
      onLogin();
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
        height: '76vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid 
        container
        sx={{
          height: isMobile ? 'auto' : '80vh',
          borderRadius: 2,
          overflow: 'hidden',
          // boxShadow: 3,
          marginTop: isMobile ? "30px" : 0,
          justifyContent: 'center' // Ensure the grid is centered
        }}
      >
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{
            p: isMobile ? 3 : 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            boxShadow: 3, // Ensure shadow is applied only to this section
            borderRadius: 2 // Apply border-radius only to this section
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
                    fontWeight: "bold",
                    background: 'linear-gradient(to right, #0A0A3D, #1C1C6B, #2E2E9F, #5050D4, #5050D4)',
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(to right, #0A0A3D, #1C1C6B, #2E2E9F, #5050D4, #5050D4)',
                    }
                  }}
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;