import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function MyTeam() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Team
      </Typography>
      <List>
        {teamMembers.map((member) => (
          <ListItem key={member.id}>
            <ListItemAvatar>
              <Avatar alt={member.name} src={member.avatar} />
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={member.role} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
