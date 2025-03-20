import { Box, Button, Grid, Typography, TextField, Avatar, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use dashboard theme colors

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="90vh"
    >
      <Box 
        p={4} 
        borderRadius={3} 
        boxShadow="4px 4px 10px rgba(0, 0, 0, 0.15)"
        sx={{
          bgcolor: "#ffffff",
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
        }}
      >
        {/* Profile Header */}
        <Box textAlign="center" mb={3}>
          <Avatar 
            src="https://i.pravatar.cc/150?img=10" 
            alt="Profile" 
            sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }} 
          />
          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
            {profileData.name}
          </Typography>
          <Typography variant="body1" color={colors.grey[300]}>
            {profileData.email}
          </Typography>
        </Box>

        {/* Profile Info */}
        <Grid container spacing={2}>
          {Object.keys(profileData).map((key) => (
            <Grid item xs={12} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={profileData[key]}
                onChange={setProfileData}
                fullWidth
                disabled={!isEditing}
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px", // Soft rounded corners
                      border: `1px solid ${theme.palette.mode === "dark" ? "#555" : "#ccc"}`, // Thin border
                      backgroundColor: theme.palette.mode === "dark" ? "#1f2a40" : "#ffffff", // Background color
                      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
                      "&:hover": {
                        borderColor: theme.palette.mode === "dark" ? "#888" : "#999", // Hover effect
                        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow on hover
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.mode === "dark" ? "#bbb" : "#555",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Removes the default outline
                    },
                  }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button 
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditToggle}
            sx={{
              bgcolor: isEditing ? colors.greenAccent[500] : colors.blueAccent[700],
              color: "#fff",
              px: 3,
              "&:hover": { bgcolor: isEditing ? colors.greenAccent[700] : colors.blueAccent[900] },
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
          <Button 
            variant="contained"
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: colors.redAccent[600],
              color: "#fff",
              px: 3,
              "&:hover": { bgcolor: colors.redAccent[800] },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
