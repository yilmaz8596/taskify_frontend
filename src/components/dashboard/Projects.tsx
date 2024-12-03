import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const initialProjects = [
  { id: 1, name: "Website Redesign", progress: 75 },
  { id: 2, name: "Mobile App Development", progress: 30 },
  { id: 3, name: "Database Migration", progress: 90 },
  { id: 4, name: "AI Integration", progress: 10 },
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectProgress, setNewProjectProgress] = useState(0);

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setNewProjectName(project.name);
    setNewProjectProgress(project.progress);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setNewProjectName("");
    setNewProjectProgress(0);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (isEditing && selectedProject) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === selectedProject.id
            ? { ...proj, name: newProjectName, progress: newProjectProgress }
            : proj
        )
      );
    } else {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        progress: newProjectProgress,
      };
      setProjects((prev) => [...prev, newProject]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProject}
        sx={{ mb: 3 }}
      >
        Add New Project
      </Button>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Progress: {project.progress}%
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Adding/Editing Project */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Progress (%)"
            type="number"
            value={newProjectProgress}
            onChange={(e) =>
              setNewProjectProgress(
                Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
              )
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProject} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
