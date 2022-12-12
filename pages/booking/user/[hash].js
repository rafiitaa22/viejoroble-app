import Head from "next/head";
import AllBookings from "../../../components/booking/AllBookings";

const booking = () => {
  return (
    <>
      <Head>
        <title>Mis Reservas- El Viejo Roble Sabadell</title>
        <meta
          name="description"
          content="Reservar mesa - El Viejo Roble Sabadell"
        />
      </Head>
      <AllBookings />
    </>
  );
};

export default booking;
