import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Typography } from "@mui/material";

function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div style={{ marginBottom: "30px" }}>
      {user && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" gutterBottom style={{ marginRight: "10px" }}>
            {user.displayName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            ({user.email})
          </Typography>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
