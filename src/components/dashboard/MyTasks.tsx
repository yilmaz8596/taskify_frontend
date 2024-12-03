import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Task {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  description: string;
  category: {
    priority: "Extreme" | "Moderate" | "Low";
    status: "Pending" | "In Progress" | "Completed";
    additionalFields: { [key: string]: string };
  };
  additionalNotes: string[];
  deadline: string;
  userID: string;
}

const priorityLevels = ["Extreme", "Moderate", "Low"];
const statusLevels = ["Pending", "In Progress", "Completed"];

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: "Write documentation",
          subtitle: "API docs",
          objective: "Improve developer experience",
          description:
            "Create comprehensive API documentation for the new features",
          category: {
            priority: "Moderate",
            status: "In Progress",
            additionalFields: {},
          },
          additionalNotes: [
            "Include code examples",
            "Add troubleshooting section",
          ],
          deadline: "2023-07-10",
          userID: "user123",
        },
        {
          id: 2,
          title: "Fix bug in login system",
          subtitle: "Authentication issue",
          objective: "Enhance security",
          description:
            "Resolve the issue with token expiration in the login system",
          category: {
            priority: "Extreme",
            status: "Pending",
            additionalFields: {},
          },
          additionalNotes: ["Check token refresh mechanism"],
          deadline: "2023-07-15",
          userID: "user123",
        },
        {
          id: 3,
          title: "Design new feature mockup",
          subtitle: "User dashboard",
          objective: "Improve user experience",
          description: "Create mockups for the new user dashboard layout",
          category: {
            priority: "Low",
            status: "Completed",
            additionalFields: {},
          },
          additionalNotes: [],
          deadline: "2023-07-05",
          userID: "user123",
        },
      ]);
    }, 1000);
  }, []);

  const handleOpenDialog = (task: Task | null) => {
    setCurrentTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCurrentTask(null);
    setOpenDialog(false);
  };

  const handleSaveTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask: Task = {
      id: currentTask ? currentTask.id : Date.now(),
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      objective: formData.get("objective") as string,
      description: formData.get("description") as string,
      category: {
        priority: formData.get("priority") as "Extreme" | "Moderate" | "Low",
        status: formData.get("status") as
          | "Pending"
          | "In Progress"
          | "Completed",
        additionalFields: {},
      },
      additionalNotes: (formData.get("additionalNotes") as string)
        .split("\n")
        .filter((note) => note.trim() !== ""),
      deadline: formData.get("deadline") as string,
      userID: "user123", // This should be dynamically set based on the logged-in user
    };

    if (currentTask) {
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? newTask : task))
      );
    } else {
      setTasks([...tasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      <Button
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog(null)}
        sx={{ mb: 2 }}
      >
        Add New Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.category.status === "Completed"}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.title}
              secondary={`${task.subtitle} | Deadline: ${task.deadline}`}
            />
            <Chip
              label={task.category.status}
              color={
                task.category.status === "Completed"
                  ? "success"
                  : task.category.status === "In Progress"
                    ? "warning"
                    : "default"
              }
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              label={task.category.priority}
              color={
                task.category.priority === "Extreme"
                  ? "error"
                  : task.category.priority === "Moderate"
                    ? "warning"
                    : "success"
              }
              size="small"
              sx={{ mr: 1 }}
            />
            <IconButton onClick={() => handleOpenDialog(task)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{currentTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <form onSubmit={handleSaveTask}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Task Title"
              type="text"
              fullWidth
              defaultValue={currentTask?.title || ""}
            />
            <TextField
              margin="dense"
              name="subtitle"
              label="Subtitle"
              type="text"
              fullWidth
              defaultValue={currentTask?.subtitle || ""}
            />
            <TextField
              margin="dense"
              name="objective"
              label="Objective"
              type="text"
              fullWidth
              defaultValue={currentTask?.objective || ""}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              defaultValue={currentTask?.description || ""}
            />
            <TextField
              select
              margin="dense"
              name="priority"
              label="Priority"
              fullWidth
              defaultValue={currentTask?.category.priority || "Low"}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {priorityLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              margin="dense"
              name="status"
              label="Status"
              fullWidth
              defaultValue={currentTask?.category.status || "Pending"}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {statusLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="additionalNotes"
              label="Additional Notes"
              type="text"
              fullWidth
              multiline
              rows={4}
              defaultValue={currentTask?.additionalNotes.join("\n") || ""}
              helperText="Enter each note on a new line"
            />
            <TextField
              margin="dense"
              name="deadline"
              label="Deadline"
              type="date"
              fullWidth
              defaultValue={currentTask?.deadline || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
