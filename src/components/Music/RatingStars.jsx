import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { saveRating, deleteRating } from "../../services/ratingService";

function RatingStars({ songId, userId, initialRating, onRatingChange, songName, artistName, albumCoverUrl }) {
  const [value, setValue] = useState(initialRating);

  useEffect(() => {
    setValue(initialRating); // 초기 별점 설정
  }, [initialRating]);

  const handleRatingChange = async (newValue) => {
    try {
      if (!userId) {
        console.error("userId is undefined in RatingStars");
        return;
      }

      console.log("Saving Rating with: ", {
        userId,
        songId,
        newValue,
        songName,
        artistName,
        albumCoverUrl
      });

      if (newValue === value) {
        setValue(null); // 동일한 별점을 클릭하면 삭제
        await deleteRating(userId, songId); // Firestore에서 별점 삭제
        onRatingChange && onRatingChange(null); // onRatingChange 함수가 있을 때만 호출
      } else {
        setValue(newValue); // 새 별점 설정
        await saveRating(userId, songId, newValue, songName, artistName, albumCoverUrl); // Firestore에 별점 저장
        onRatingChange && onRatingChange(newValue); // onRatingChange 함수가 있을 때만 호출
      }
    } catch (error) {
      console.error("Error handling rating change:", error);
    }
  };

  return (
    <Rating
      name="half-rating"
      value={value || 0}
      precision={0.5}
      onChange={(event, newValue) => handleRatingChange(newValue)}
    />
  );
}

export default RatingStars;
