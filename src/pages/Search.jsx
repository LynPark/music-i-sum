import React from "react";
import MusicSearch from "../components/Music/MusicSearch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

function Search() {
  const [user] = useAuthState(auth);
  return (
    <div className="mp">
      <MusicSearch userId={user?.uid} />
    </div>
  );
}

export default Search;
