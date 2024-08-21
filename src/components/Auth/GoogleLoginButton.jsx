import React from "react";
import { useAuth } from "../../hooks/useAuth";

function GoogleLoginButton() {
  const { signInWithGoogle } = useAuth();

  return <button onClick={signInWithGoogle}>구글로그인</button>;
}

export default GoogleLoginButton;
