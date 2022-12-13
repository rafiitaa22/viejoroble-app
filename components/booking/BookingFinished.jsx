// import BookingStatus from "./BookingStatus";
import dayjs from "dayjs";
import classes from "../../styles/Booking.module.css";
import { MESES, ESTADOS } from "../global";
import { MdPeople } from "react-icons/md";
import { GiDirectorChair } from "react-icons/gi";
import { TbBabyCarriage } from "react-icons/tb";
import { useEffect, useState } from "react";
import StatusIcon from "./StatusIcon";
import { useRouter } from "next/router";
import "dayjs/locale/es";

const BookingFinished = () => {
  const router = useRouter();

  const [bookingInfo, setBookingInfo] = useState(null);
  const hash = router.query.hash;
  console.log(router.query);

  useEffect(() => {
    const fetchBookingStatus = () => {
      fetch(`/api/booking/${encodeURIComponent(hash)}`)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setBookingInfo(data);
        });
    };
    if (hash !== undefined) {
      fetchBookingStatus();
    }
  }, [hash]);

  if (hash === undefined || bookingInfo === null) return;

  const replaceBookingInfo = (text) => {
    console.log(text);
    console.log(bookingInfo);
    dayjs.locale('es')
    return text
      .replace("{nombre}", bookingInfo.nombre)
      .replace("{day}", dayjs(bookingInfo.fecha_reserva).date())
      .replace("{weekDay}", dayjs(bookingInfo.fecha_reserva).format("dddd"))
      .replace("{month}", MESES[dayjs(bookingInfo.fecha_reserva).month()])
      .replace("{year}", dayjs(bookingInfo.fecha_reserva).year())
      .replace("{hour}", dayjs(bookingInfo.fecha_reserva).format("HH:mm"))
      .replace("{prefCont}", bookingInfo.prefCont);
  };
  // console.log(bookingInfo);
  return (
    <div className={classes.bookingConfirmed}>
      <StatusIcon status={bookingInfo.estado} />
      <h1
        className={classes.title}
        style={{ color: ESTADOS[bookingInfo.estado].backgroundColor }}
      >
        {replaceBookingInfo(ESTADOS[bookingInfo.estado].title)}
      </h1>
      <p className={classes.text}>
        {replaceBookingInfo(ESTADOS[bookingInfo.estado].text)}
      </p>
      <div className={classes.additionalInfo}>
        <div>
          {bookingInfo.comensales}
          <MdPeople />
        </div>
        {bookingInfo.tronas !== null && bookingInfo.tronas !== "" && (
          <div>
            {bookingInfo.tronas}
            <GiDirectorChair />
          </div>
        )}
        {bookingInfo.carros !== null && bookingInfo.carros !== "" && (
          <div>
            {bookingInfo.carros}
            <TbBabyCarriage />
          </div>
        )}
      </div>
      {/* <BookingStatus status={bookingStatus} /> */}

      {/* <button
        className="btn btn-primary mt-5"
        onClick={() => setShowForm(true)}
      >
        Volver a reservar
      </button> */}
    </div>
  );
};

export default BookingFinished;
