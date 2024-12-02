import { useStore } from "./store/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/sunflower";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const theme = createTheme({
  typography: {
    fontFamily: "Sunflower, sans-serif",
  },
});
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
export default function App() {
  const { user } = useStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />}>
              <Route path="success" element={<Success />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
