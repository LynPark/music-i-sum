import React from "react";
import UserProfile from "../components/Mypage/UserProfile";
import SongList from "../components/Mypage/SongList";

function Mypage() {
  return (
    <div>
      <h1>My Page</h1>
      <UserProfile />
      <SongList />
    </div>
  );
}

export default Mypage;
