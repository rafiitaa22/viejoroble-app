import Booking from "../components/booking/Booking";
import Head from "next/head";

const booking = () => {
  return (
    <>
      <Head>
        <title>Reservar mesa - El Viejo Roble Sabadell</title>
        <meta
          name="description"
          content="Reservar mesa - El Viejo Roble Sabadell"
        />
      </Head>
      <Booking />
    </>
  );
};

export default booking;
