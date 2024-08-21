import React from 'react';
import RatingStars from './RatingStars';

function MusicCard({ music }) {
    return (
        <div>
            <img src={music.artworkUrl100} alt={music.trackName} />
            <h3>{music.trackName}</h3>
            <p>{music.artistName}</p>
            <RatingStars songId={music.trackId} />
        </div>
    );
}

export default MusicCard;
