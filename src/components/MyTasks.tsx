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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
interface Task {
  id: number;
  title: string;
  status: "Not Started" | "In Progress" | "Completed";
  deadline: string;
}

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
          status: "In Progress",
          deadline: "2023-07-10",
        },
        {
          id: 2,
          title: "Fix bug in login system",
          status: "Not Started",
          deadline: "2023-07-15",
        },
        {
          id: 3,
          title: "Design new feature mockup",
          status: "Completed",
          deadline: "2023-07-05",
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
      status: formData.get("status") as
        | "Not Started"
        | "In Progress"
        | "Completed",
      deadline: formData.get("deadline") as string,
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
              <Checkbox edge="start" checked={task.status === "Completed"} />
            </ListItemIcon>
            <ListItemText
              primary={task.title}
              secondary={`Deadline: ${task.deadline}`}
            />
            <Chip
              label={task.status}
              color={
                task.status === "Completed"
                  ? "success"
                  : task.status === "In Progress"
                    ? "warning"
                    : "default"
              }
              size="small"
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
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
              select
              margin="dense"
              name="status"
              label="Status"
              fullWidth
              defaultValue={currentTask?.status || "Not Started"}
            >
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
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
