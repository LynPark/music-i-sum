import React from "react";
import UserProfile from "../components/Mypage/UserProfile";
import MyRatings from "./MyRatings";

function Mypage() {
  return (
    <div className="mp">
      <h1>My Page</h1>
      <UserProfile />
      <MyRatings/>
    </div>
  );
}

export default Mypage;
