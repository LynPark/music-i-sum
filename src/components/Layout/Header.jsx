import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import { auth } from "../../services/firebase";
import LogoutButton from "../Auth/LogoutButton";

export default function Header() {
  const [user, error] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          height: "75px",
          justifyContent: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          backgroundColor: "#324099",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white", fontWeight: "550" }}
            >
              MUSIC I SUM
            </Typography>

            {user && (
              <Button
                component={Link}
                to="/chat"
                color="inherit"
                sx={{ textTransform: "none" }}
                style={{ fontSize: "25px", marginLeft: "30px" }}
              >
                Chat
              </Button>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {user && (
              <Button
                component={Link}
                to="/mypage"
                color="inherit"
                sx={{ textTransform: "none" }}
                style={{ fontSize: "20px", marginRight: "20px" }}
              >
                My Page
              </Button>
            )}
            {user ? <LogoutButton /> : <GoogleLoginButton />}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
