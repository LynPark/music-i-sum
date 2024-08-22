import { db, setDoc, doc, deleteDoc } from './Firebase';

export const saveRating = async (userId, songId, rating) => {
  if (!userId || !songId) {
    console.error("userId or songId is undefined in saveRating");
    return;
  }

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
