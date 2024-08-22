import React from "react";
import UserProfile from "../components/Mypage/UserProfile";
import MyRatings from "./MyRatings";
import { Link } from "react-router-dom";
// import SongList from "../components/Mypage/SongList";

function Mypage() {
  return (
    <div className="mp">
      <h1>My Page</h1>
      <UserProfile />
      {/* <SongList /> */}
      <Link to="/mypage/ratings">My Ratings</Link>
    </div>
  );
}

export default Mypage;
