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
import { IoPersonAdd, IoPersonAddOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (
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
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <h1 className="text-3xl font-bold">Register</h1>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IoPersonAdd />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IoPersonAddOutline />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IoMdPerson />
                  </InputAdornment>
                ),
              },
            }}
          />
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
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword ? "hide password" : "show password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    onMouseUp={handleMouseUpConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I agree all terms"
          />
          <ColorButton variant="contained" sx={{ width: "100%" }}>
            Register
          </ColorButton>
        </FormGroup>
        <span className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer text-blue-600">
            Login
          </Link>
        </span>
      </Box>
    </Box>
  );
}
