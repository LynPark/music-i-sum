import React, { useEffect, useState } from "react";
import axios from "axios";

const ItunesMusic = ({ recommendations }) => {
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const searchTerms = recommendations.map(
        (rec) => `${rec.trackName} ${rec.artistName}`
      );
      const responses = await Promise.all(
        searchTerms.map((term) =>
          axios.get(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              term
            )}&media=music&entity=song`
          )
        )
      );

      const aggregatedResults = responses.flatMap((response) =>
        response.data.results.filter((track) =>
          recommendations.some(
            (rec) =>
              rec.trackName.toLowerCase() === track.trackName.toLowerCase() &&
              rec.artistName.toLowerCase() === track.artistName.toLowerCase()
          )
        )
      );

      // Remove duplicates based on trackId
      const uniqueResults = [];
      const trackIds = new Set();

      aggregatedResults.forEach((track) => {
        if (!trackIds.has(track.trackId)) {
          uniqueResults.push(track);
          trackIds.add(track.trackId);
        }
      });

      setResults(uniqueResults);
      console.log(uniqueResults);
    } catch (error) {
      console.log("Error fetching data from iTunes API:", error);
    }
  };

  useEffect(() => {
    if (recommendations.length > 0) {
      handleSearch();
    }
  }, [recommendations]);

  return (
    <div>
      <h1>iTunes Music Search</h1>

      <div>
        {results && (
          <ul>
            {results.map((track) => (
              <li key={track.trackId}>
                <p>
                  {track.trackName} by {track.artistName}
                </p>
                <p>{track.collectionName}</p>
                <img src={track.artworkUrl100} alt="Album Art" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItunesMusic;
