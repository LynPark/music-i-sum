import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import RatingComponent from "../components/RatingComponent";

function MyPage() {
  const [user] = useAuthState(auth);
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    const fetchSongs = async () => {
      if (user) {
        const q = query(
          collection(db, "ratings"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setSongs(querySnapshot.docs.map((doc) => doc.data()));
      }
    };
    fetchSongs();
  }, [user]);

  return (
    <div>
      <h1>{user ? user.displayName : "My Page"}</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <h3>{song.trackName}</h3>
            <p>{song.artistName}</p>
            <RatingComponent value={song.rating} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;
