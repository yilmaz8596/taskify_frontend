import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const data = [
  { name: "Completed", value: 400 },
  { name: "In Progress", value: 300 },
  { name: "Not Started", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const currentUser = "John Doe";
const existingUsers = [
  { name: "User 1", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "User 2", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "User 3", avatar: "/placeholder.svg?height=32&width=32" },
];

const todaysTasks = [
  { id: 1, title: "Complete project proposal", deadline: "2023-06-30 14:00" },
  { id: 2, title: "Review team performance", deadline: "2023-06-30 16:00" },
  { id: 3, title: "Prepare for client meeting", deadline: "2023-06-30 17:30" },
];

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">Welcome back, {currentUser}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup max={3} sx={{ mr: 2 }}>
            {existingUsers.map((user, index) => (
              <Avatar key={index} alt={user.name} src={user.avatar} />
            ))}
            <Avatar>+4</Avatar>
          </AvatarGroup>
          <Button variant="outlined" startIcon={<PersonAddIcon />}>
            Invite
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tasks Due Today
            </Typography>
            <List>
              {todaysTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <ListItem>
                    <ListItemText
                      primary={task.title}
                      secondary={`Due: ${new Date(task.deadline).toLocaleTimeString()}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }}>
              Add Task
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Task Status
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Total Tasks: 1000</Typography>
              <Typography variant="body1">Completed Tasks: 400</Typography>
              <Typography variant="body1">Overdue Tasks: 50</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
