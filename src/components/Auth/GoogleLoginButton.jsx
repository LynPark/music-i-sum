import React from "react";
import { useAuth } from "../../hooks/useAuth";

function GoogleLoginButton() {
  const { signInWithGoogle } = useAuth();

  return <button onClick={signInWithGoogle}>Google Login</button>;
}

export default GoogleLoginButton;
