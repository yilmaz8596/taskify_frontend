import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { IconButton, Typography, CssBaseline } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import TaskIcon from "@mui/icons-material/Task";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import Dashboard from "./Dashboard";
import VitalTasks from "./VitalTasks";
import MyTasks from "./MyTasks";
import TaskCategories from "./TaskCategories";
import Projects from "./Projects";
import MyTeam from "./MyTeam";
import Profile from "./Profile";
import Settings from "./Settings";
import Support from "./Support";

import "@fontsource/sunflower";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "vital-tasks",
    title: "Vital Tasks",
    icon: <PriorityHighIcon />,
  },
  {
    segment: "my-tasks",
    title: "My Tasks",
    icon: <TaskIcon />,
  },
  {
    segment: "task-categories",
    title: "Task Categories",
    icon: <CategoryIcon />,
  },
  {
    segment: "projects",
    title: "Projects",
    icon: <AssignmentIcon />,
  },
  {
    segment: "my-team",
    title: "My Team",
    icon: <GroupAddIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    segment: "support",
    title: "Support",
    icon: <SupportAgentIcon />,
  },
];

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#4CAF50" : "#81C784",
      },
      secondary: {
        main: mode === "light" ? "#FFC107" : "#FFD54F",
      },
      background: {
        default: mode === "light" ? "#F1F8E9" : "#1C2833",
        paper: mode === "light" ? "#FFFFFF" : "#2C3E50",
      },
      text: {
        primary: mode === "light" ? "#2E7D32" : "#A5D6A7",
        secondary: mode === "light" ? "#689F38" : "#C5E1A5",
      },
    },
    typography: {
      fontFamily: "Sunflower, sans-serif",
      allVariants: {
        color: mode === "light" ? "#2e7d32" : "#81c784",
      },
    },
  });

function DemoPageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/dashboard":
      return <Dashboard />;
    case "/vital-tasks":
      return <VitalTasks />;
    case "/my-tasks":
      return <MyTasks />;
    case "/task-categories":
      return <TaskCategories />;
    case "/projects":
      return <Projects />;
    case "/my-team":
      return <MyTeam />;
    case "/profile":
      return <Profile />;
    case "/settings":
      return <Settings />;
    case "/support":
      return <Support />;
    default:
      return <Dashboard />;
  }
}

interface DemoProps {
  window?: () => Window;
  children?: React.ReactNode;
}

export default function DashboardProvider(props: DemoProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const router = useDemoRouter("/dashboard");

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const ThemeToggle = () => (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        position: "fixed",
        right: 16,
        top: 16,
        zIndex: 2000,
        color: theme.palette.text.primary,
      }}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={theme}
        branding={{
          title: "",
          logo: (
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                position: "fixed",
                top: 16,
                left: 64,
                fontFamily: "Sunflower, sans-serif",
              }}
            >
              Taskify
            </Typography>
          ),
        }}
      >
        <ThemeToggle />
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
        {props.children}
      </AppProvider>
    </ThemeProvider>
  );
}
