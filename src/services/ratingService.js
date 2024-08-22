import { db, setDoc, doc, deleteDoc } from './Firebase';
import axios from 'axios';

export const fetchSongDetails = async (songId) => {
  try {
    const response = await axios.get(`https://itunes.apple.com/lookup?id=${songId}`);
    if (response.data.results.length > 0) {
      const songData = response.data.results[0];
      return {
        songName: songData.trackName,
        artistName: songData.artistName,
        albumCoverUrl: songData.artworkUrl100,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching song details from iTunes API:", error);
    return null;
  }
};

export const saveRating = async (userId, songId, rating) => {
  if (!userId || !songId) {
    console.error("userId or songId is undefined in saveRating");
    return;
  }

  try {
    // iTunes API에서 곡 정보를 가져옴
    const songDetails = await fetchSongDetails(songId);
    
    if (!songDetails) {
      console.error("Song details could not be fetched for songId:", songId);
      return;
    }

    const { songName, artistName, albumCoverUrl } = songDetails;

    const ratingDoc = doc(db, 'ratings', `${userId}_${songId}`);
    await setDoc(ratingDoc, {
      userId,
      songId,
      rating,
      songName: songName || 'Unknown Song',
      artistName: artistName || 'Unknown Artist',
      albumCoverUrl: albumCoverUrl || 'https://via.placeholder.com/100',
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error saving rating: ", error);
  }
};

export const deleteRating = async (userId, songId) => {
  if (!userId || !songId) {
    console.error("userId or songId is undefined in deleteRating");
    return;
  }

  try {
    const ratingDoc = doc(db, 'ratings', `${userId}_${songId}`);
    await deleteDoc(ratingDoc);
  } catch (error) {
    console.error("Error deleting rating: ", error);
  }
};
