import { useState } from "react";
import bg from "../assets/bg.jpg";
import {
  Box,
  TextField,
  InputAdornment,
  FormGroup,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MdEmail } from "react-icons/md";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";
import { FcGoogle } from "react-icons/fc";
import { Facebook, X } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[800],
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          padding: "60px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <MdEmail />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <ColorButton variant="contained" sx={{ width: "100%" }}>
            Login
          </ColorButton>
        </FormGroup>
        <div className="flex gap-1 items-center justify-start mt-12">
          <span>Or, Login with</span>
          <IconButton aria-label="login with google">
            <FcGoogle />
          </IconButton>
          <IconButton aria-label="login with facebook">
            <Facebook className="text-blue-600" />
          </IconButton>
          <IconButton aria-label="twitter">
            <X className="text-black" />
          </IconButton>
        </div>
        <span className="mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="cursor-pointer text-blue-600">
            Register
          </Link>
        </span>
      </Box>
    </Box>
  );
}
