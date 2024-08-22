import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import RatingStars from "./RatingStars";
import { db } from "../../services/Firebase";
import { doc, getDoc } from "firebase/firestore";

function MusicCard({ music, userId }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const ratingDoc = await getDoc(doc(db, "ratings", `${userId}_${music.trackId}`));
        if (ratingDoc.exists()) {
          setRating(ratingDoc.data().rating);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    if (userId) {
      fetchRating();
    } else {
      console.error("userId is undefined");
    }
  }, [music.trackId, userId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={music.artworkUrl100}
        alt={music.trackName}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {music.trackName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {music.artistName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {music.collectionName}
          </Typography>
          {userId ? (
            <RatingStars
              songId={music.trackId}
              userId={userId}
              initialRating={rating}
              onRatingChange={handleRatingChange}
            />
          ) : (
            <Typography variant="subtitle2" color="text.secondary" component="div">
              로그인 후 별점을 매길 수 있습니다.
            </Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}

export default MusicCard;
