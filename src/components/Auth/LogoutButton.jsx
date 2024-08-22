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
  return <button onClick={logout}>로그아웃</button>;
}

export default LogoutButton;
