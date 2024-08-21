import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/Firebase";
import { signOut } from "firebase/auth";
import LogoutButton from "../Auth/LogoutButton";

function Header() {
  const [user, error] = useAuthState(auth);
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/chat">Chat</Link>
            <Link to="/mypage">My Page</Link>
          </>
        ) : null}
        {user ? <LogoutButton /> : <GoogleLoginButton />}
      </nav>
    </header>
  );
}
export default Header;
