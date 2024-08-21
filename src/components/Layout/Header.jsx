import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../Auth/GoogleLoginButton";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/mypage">My Page</Link>
      </nav>
      <GoogleLoginButton />
    </header>
  );
}

export default Header;
