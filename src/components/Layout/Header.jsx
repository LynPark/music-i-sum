import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import { auth } from "../../services/Firebase";
import LogoutButton from "../Auth/LogoutButton";

export default function Header() {
  const [user, error] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ height: "75px", justifyContent: 'center' }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "white" }}
          >
            MUSIC I SUM
          </Typography>

          {user && (
            <Button
              component={Link}
              to="/chat"
              color="inherit"
              sx={{ textTransform: "none" }}
              style={{ fontSize: "20px" }}
            >
              Chat
            </Button>
          )}

          {user && (
            <Button
              component={Link}
              to="/mypage"
              color="inherit"
              sx={{ textTransform: "none" }}
              style={{ fontSize: "20px" }}
            >
              My Page
            </Button>
          )}
          {user ? <LogoutButton /> : <GoogleLoginButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
