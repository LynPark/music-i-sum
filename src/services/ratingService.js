import { db, setDoc, doc } from './Firebase';

export const saveRating = async (userId, songId, rating) => {
  try {
    const ratingDoc = doc(db, 'ratings', `${userId}_${songId}`);
    await setDoc(ratingDoc, {
      userId,
      songId,
      rating,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error saving rating: ", error);
  }
};
