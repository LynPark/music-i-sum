import React, { useState } from "react";
import { Rating } from "@mui/material";

function RatingStars() {
  const [value, setValue] = useState(0);

  return (
    <Rating
      name="half-rating"
      value={value}
      precision={0.5}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}

export default RatingStars;
