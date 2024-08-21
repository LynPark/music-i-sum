import React from "react";
import MusicCard from "./MusicCard";

function MusicList({ results }) {
  return (
    <div>
      {results.map((music) => (
        <MusicCard key={music.trackId} music={music} />
      ))}
    </div>
  );
}

export default MusicList;
