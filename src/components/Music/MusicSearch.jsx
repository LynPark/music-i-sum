import React, { useState } from "react";
import { searchMusic } from "../../services/iTunesAPI";
import MusicList from "./MusicList";

function MusicSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const musicResults = await searchMusic(query);
    setResults(musicResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music"
      />
      <button onClick={handleSearch}>Search</button>
      <MusicList results={results} />
    </div>
  );
}

export default MusicSearch;
