import React, { useState } from "react";
import MusicList from "./MusicList";
import { TextField, Button, Container, Grid } from "@mui/material";
import { searchMusic } from "../../services/iTunesAPI";
import Typography from "@mui/material/Typography";

function MusicSearch({ userId }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const musicResults = await searchMusic(query);
    setResults(musicResults);
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Search Music
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: "15px" }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search for music"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ background: "white" }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{ height: "100%" }}
            style={{ background: "#324099" }}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
          variant="outlined"
          onClick={handleReset}
          fullWidth
          sx={{ height: "100%" }}
          style={{ color: "#324099", borderColor: "#324099" }}>
            Reset
          </Button>
        </Grid>
      </Grid>
      <MusicList results={results} userId={userId} />
    </Container>
  );
}

export default MusicSearch;
