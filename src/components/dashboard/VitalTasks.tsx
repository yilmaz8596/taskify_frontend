import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

interface VitalTask {
  id: number;
  task: string;
  deadline: string;
  details?: string;
  status: "Not Started" | "In Progress" | "Completed";
}

const initialVitalTasks: VitalTask[] = [
  {
    id: 1,
    task: "Complete project proposal",
    deadline: "2023-06-30",
    details: "Include budget and timeline",
    status: "Not Started",
  },
  {
    id: 2,
    task: "Review team performance",
    deadline: "2023-07-05",
    details: "Prepare individual feedback",
    status: "In Progress",
  },
  {
    id: 3,
    task: "Prepare for client meeting",
    deadline: "2023-07-02",
    details: "Review project progress and gather materials",
    status: "Not Started",
  },
];

export default function VitalTasks() {
  const [vitalTasks, setVitalTasks] = useState<VitalTask[]>(initialVitalTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<VitalTask | null>(null);
  const [dialogMode, setDialogMode] = useState<"details" | "edit" | "delete">(
    "details"
  );

  const handleOpenDialog = (
    task: VitalTask,
    mode: "details" | "edit" | "delete"
  ) => {
    setSelectedTask(task);
    setDialogMode(mode);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleEditTask = (editedTask: VitalTask) => {
    setVitalTasks(
      vitalTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    handleCloseDialog();
  };

  const handleDeleteTask = (taskId: number) => {
    setVitalTasks(vitalTasks.filter((task) => task.id !== taskId));
    handleCloseDialog();
  };

  const handleMarkAsCompleted = (taskId: number) => {
    setVitalTasks(
      vitalTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      )
    );
  };

  const handleChangeStatus = (
    taskId: number,
    newStatus: VitalTask["status"]
  ) => {
    setVitalTasks(
      vitalTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vital Tasks
      </Typography>
      <List>
        {vitalTasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemIcon>
              <Checkbox edge="start" checked={task.status === "Completed"} />
            </ListItemIcon>
            <ListItemText
              primary={task.task}
              secondary={`Deadline: ${task.deadline} | Status: ${task.status}`}
            />
            <IconButton
              onClick={() => handleOpenDialog(task, "details")}
              aria-label="details"
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              onClick={() => handleOpenDialog(task, "edit")}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteTask(task.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <ListItemIcon>
              <PriorityHighIcon color="error" />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "details" && "Task Details"}
          {dialogMode === "edit" && "Edit Task"}
          {dialogMode === "delete" && "Delete Task"}
        </DialogTitle>
        <DialogContent>
          {dialogMode === "details" && selectedTask && (
            <>
              <Typography variant="h6">{selectedTask.task}</Typography>
              <Typography>Deadline: {selectedTask.deadline}</Typography>
              <Typography>Details: {selectedTask.details}</Typography>
              <Typography>Status: {selectedTask.status}</Typography>
            </>
          )}
          {dialogMode === "edit" && selectedTask && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Task"
                value={selectedTask.task}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, task: e.target.value })
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Deadline"
                type="date"
                value={selectedTask.deadline}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, deadline: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Details"
                multiline
                rows={4}
                value={selectedTask.details}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, details: e.target.value })
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedTask.status}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      status: e.target.value as VitalTask["status"],
                    })
                  }
                  label="Status"
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          {dialogMode === "delete" && (
            <Typography>Are you sure you want to delete this task?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogMode === "edit" && (
            <>
              <Button
                onClick={() =>
                  selectedTask && handleMarkAsCompleted(selectedTask.id)
                }
                startIcon={<CheckCircleIcon />}
              >
                Mark as Completed
              </Button>
              <Button
                onClick={() => selectedTask && handleEditTask(selectedTask)}
                startIcon={<ChangeCircleIcon />}
              >
                Save Changes
              </Button>
            </>
          )}
          {dialogMode === "delete" && (
            <Button
              onClick={() => selectedTask && handleDeleteTask(selectedTask.id)}
              color="error"
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
