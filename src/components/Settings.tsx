import React from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        }
        label="Enable Notifications"
      />
      <Divider sx={{ my: 2 }} />
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        }
        label="Dark Mode"
      />
    </Box>
  );
}
