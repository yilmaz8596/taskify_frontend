import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Confetti from "react-confetti";

export default function Success() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    setOpen(true);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Confetti width={dimensions.width} height={dimensions.height} />;
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" onClose={handleClose}>
          Register success! Please check your mail.
        </Alert>
      </Snackbar>
    </>
  );
}
