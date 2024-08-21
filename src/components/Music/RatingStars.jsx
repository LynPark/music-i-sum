import React, { useState } from 'react';
import { Rating } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { saveRating } from '../../services/ratingService';

function RatingStars({ songId }) {
    const [value, setValue] = useState(0);
    const { user } = useAuth();

    const handleRatingChange = async (newValue) => {
        if (user) {
            if (!songId) {
                console.error('songId is undefined');
                return;
            }
            setValue(newValue);
            try {
                await saveRating(user.uid, songId, newValue);
                console.log('Rating saved successfully!');
            } catch (error) {
                console.error('Failed to save rating', error);
            }
        }
    };

    const handleClick = () => {
        if (!user) {
            alert("로그인이 필요합니다.");
        }
    };

    return (
        <div onClick={handleClick} style={{ display: 'inline-block' }}>
            <Rating
                name="half-rating"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => handleRatingChange(newValue)}
                readOnly={!user}
            />
        </div>
    );
}

export default RatingStars;
