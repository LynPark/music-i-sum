import React from "react";

function SongList() {
  // Placeholder data
  const songs = [
    { title: "Song 1", artist: "Artist 1", rating: 4.5 },
    { title: "Song 2", artist: "Artist 2", rating: 5 },
  ];

  return (
    <div>
      <h2>My Rated Songs</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <p>
              {song.title} by {song.artist} - Rated: {song.rating} stars
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
