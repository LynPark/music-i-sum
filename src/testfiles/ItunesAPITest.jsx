import React, { useState } from "react";
import axios from "axios";

const ItunesAPITest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&limit=10&media=music&entity=song`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data from iTunes API:", error);
    }
  };

  return (
    <div>
      <h1>iTunes API Test</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter artist or song name"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((track) => (
              <li key={track.trackId}>
                <p>
                  {track.trackName} by {track.artistName}
                </p>
                <p>{track.collectionName}</p>
                <img src={track.artworkUrl100} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ItunesAPITest;
