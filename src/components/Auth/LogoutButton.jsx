import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

function LogoutButton() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={logout}
      style={{
        background: "white",
        border: "none",
        fontSize: "20px",
        color: "#324099",
        borderRadius: "5px",
        height: "30px"
      }}
    >
      LogOut
    </button>
  );
}

export default LogoutButton;
