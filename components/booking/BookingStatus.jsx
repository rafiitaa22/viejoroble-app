import React from "react";
import { ESTADOS } from "../global";
import classes from "../../styles/Booking.module.css";

const BookingStatus = ({ status }) => {
  return (
    <div
      className={classes.status}
      style={{
        color: ESTADOS[status].color,
        backgroundColor: ESTADOS[status].backgroundColor,
      }}
    >
      {ESTADOS[status].statusText}
    </div>
  );
};

export default BookingStatus;
