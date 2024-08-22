import React from "react";
import { useAuth } from "../../hooks/useAuth";
import GoogleIcon from "@mui/icons-material/Google";

function GoogleLoginButton() {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      style={{
        background: "white",
        border: "none",
        fontSize: "20px",
        color: "#324099",
        borderRadius: "5px",
        height: "30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        Login with
        <GoogleIcon style={{ marginLeft: "5px" }} />
      </div>
    </button>
  );
}

export default GoogleLoginButton;
