import React, { useState } from "react";
import MusicList from "./MusicList";
import { TextField, Button, Container, Grid } from "@mui/material";
import { searchMusic } from "../../services/iTunesAPI";

function MusicSearch({ userId }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const musicResults = await searchMusic(query);
    setResults(musicResults);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Grid container spacing={2} style={{ marginBottom: "15px"}}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search for music"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <MusicList results={results} userId={userId} />
    </Container>
  );
}

export default MusicSearch;
