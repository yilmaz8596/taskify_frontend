import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { LinearProgress } from "@mui/material";

const projects = [
  { id: 1, name: "Website Redesign", progress: 75 },
  { id: 2, name: "Mobile App Development", progress: 30 },
  { id: 3, name: "Database Migration", progress: 90 },
  { id: 4, name: "AI Integration", progress: 10 },
];

export default function Projects() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
