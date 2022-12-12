import BookingFinished from "../../components/booking/BookingFinished";
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
      <BookingFinished />
    </>
  );
};

export default booking;
