import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  db,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "../services/Firebase";

function MyRatings() {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [sortOrder, setSortOrder] = useState("timestamp");

  useEffect(() => {
    const fetchRatings = async () => {
      if (user) {
        const q = query(
          collection(db, "ratings"),
          where("userId", "==", user.uid),
          orderBy(sortOrder, sortOrder === "rating" ? "desc" : "asc")
        );
        const querySnapshot = await getDocs(q);
        const ratingsData = querySnapshot.docs.map((doc) => doc.data());
        setRatings(ratingsData);
      }
    };
    fetchRatings();
  }, [user, sortOrder]);

  return (
    <div>
      <h1>My Rated Songs</h1>
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="timestamp">평가순</option>
        <option value="rating">별점순</option>
      </select>
      <ul>
        {ratings.map((rating, index) => (
          <li key={index}>
            <p>
              {rating.songId} - Rated: {rating.rating} stars
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRatings;
