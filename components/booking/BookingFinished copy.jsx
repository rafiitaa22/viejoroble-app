// import BookingStatus from "./BookingStatus";
import classes from "../../styles/Booking.module.css";
import { MESES, ESTADOS } from "../global";
import { MdPeople } from "react-icons/md";
import { GiDirectorChair } from "react-icons/gi";
import { TbBabyCarriage } from "react-icons/tb";
import { useEffect, useState } from "react";
import StatusIcon from "./StatusIcon";

const BookingFinished = ({ data, setShowForm }) => {
  const [bookingStatus, setBookingStatus] = useState(0);

  useEffect(() => {
    const fetchBookingStatus = () => {
      fetch(`/api/booking/${encodeURIComponent(data.hash)}`)
        .then((response) => response.json())
        .then((data) => {
          setBookingStatus(data.estado);
        });
    };

    fetchBookingStatus();
  }, [data.hash]);

  const replaceBookingInfo = (text) => {
    return text
      .replace("{nombre}", data.nombre)
      .replace("{day}", data.day)
      .replace("{month}", MESES[data.month - 1])
      .replace("{year}", data.year)
      .replace("{hour}", data.hour)
      .replace("{prefCont}", data.prefCont);
  };
  return (
    <div className={classes.bookingConfirmed}>
      <StatusIcon status={bookingStatus} />
      <h1
        className={classes.title}
        style={{ color: ESTADOS[bookingStatus].backgroundColor }}
      >
        {replaceBookingInfo(ESTADOS[bookingStatus].title)}
      </h1>
      <p className={classes.text}>
        {replaceBookingInfo(ESTADOS[bookingStatus].text)}
      </p>
      <div className={classes.additionalInfo}>
        <div>
          {data.comensales}
          <MdPeople />
        </div>
        {data.tronas !== null && data.tronas !== "" && (
          <div>
            {data.tronas}
            <GiDirectorChair />
          </div>
        )}
        {data.carros !== null && data.carros !== "" && (
          <div>
            {data.carros}
            <TbBabyCarriage />
          </div>
        )}
      </div>
      {/* <BookingStatus status={bookingStatus} /> */}

      <button
        className="btn btn-primary mt-5"
        onClick={() => setShowForm(true)}
      >
        Volver a reservar
      </button>
    </div>
  );
};

export default BookingFinished;
