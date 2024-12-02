import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    avatar: "/placeholder.svg?height=100&width=100",
  });

  useEffect(() => {
    // Simulating API call to fetch user profile
    setTimeout(() => {
      setProfile({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "",
      });
    }, 1000);
  }, []);

  const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedProfile = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
      avatar: profile.avatar, // Keeping the same avatar for simplicity
    };

    // Simulating API call to update profile
    console.log("Updating profile:", updatedProfile);
    // You would typically send this data to your backend here
    setProfile(updatedProfile);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Avatar
            alt={profile.name}
            src={profile.avatar}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleUpdateProfile}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              defaultValue={profile.name}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              defaultValue={profile.email}
            />
            <TextField
              fullWidth
              margin="normal"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              defaultValue={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Profile
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
