import React from "react";
import MusicCard from "./MusicCard";
import { Container } from "@mui/material";

function MusicList({ results, userId }) {
  return (
    <Container maxWidth="md">
      {results.map((music) => (
        <MusicCard key={music.trackId} music={music} userId={userId} />
      ))}
    </Container>
  );
}

export default MusicList;
