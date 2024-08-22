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
import { Card, CardContent, CardMedia, Typography, Box, Container, Grid } from "@mui/material";
import RatingStars from "../components/Music/RatingStars";

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
        console.log('Fetched Ratings Data:', ratingsData); // 여기서 데이터 확인
        setRatings(ratingsData);
      }
    };
    fetchRatings();
  }, [user, sortOrder]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Rated Songs
      </Typography>
      <select onChange={(e) => setSortOrder(e.target.value)} style={{ marginBottom: '20px' }}>
        <option value="timestamp">평가순</option>
        <option value="rating">별점순</option>
      </select>
      <Grid container spacing={2}>
        {ratings.map((rating, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={rating.albumCoverUrl || "https://via.placeholder.com/100"}
                alt={rating.songName}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <CardContent>
                  <Typography component="div" variant="h6">
                    {rating.songName || 'Unknown Song'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {rating.artistName || 'Unknown Artist'}
                  </Typography>
                  <RatingStars
                    songId={rating.songId}
                    userId={user.uid}
                    initialRating={rating.rating}
                    songName={rating.songName}
                    artistName={rating.artistName}
                    albumCoverUrl={rating.albumCoverUrl}
                  />
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyRatings;
