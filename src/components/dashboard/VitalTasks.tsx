import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const vitalTasks = [
  { id: 1, task: "Complete project proposal", deadline: "2023-06-30" },
  { id: 2, task: "Review team performance", deadline: "2023-07-05" },
  { id: 3, task: "Prepare for client meeting", deadline: "2023-07-02" },
];

export default function VitalTasks() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vital Tasks
      </Typography>
      <List>
        {vitalTasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              primary={task.task}
              secondary={`Deadline: ${task.deadline}`}
            />
            <ListItemIcon>
              <PriorityHighIcon color="error" />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
