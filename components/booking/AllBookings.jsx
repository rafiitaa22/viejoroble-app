import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleBooking from "./SingleBooking";
import classes from "../../styles/AllBookings.module.css";
const AllBookings = () => {
  const router = useRouter();
  const [allBookings, setAllBookings] = useState(null);

  useEffect(() => {
    const fetchAllBookingsBySomeHash = () => {
      fetch(`/api/booking/user/${encodeURIComponent(router.query.hash)}`)
        .then((response) => {
          if (!response.ok) throw Error;
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setAllBookings(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    router.query.hash && fetchAllBookingsBySomeHash();
  }, [router.query.hash]);

  return (
    <div className={classes.allBookings}>
      <h1>Mis reservas</h1>
      {allBookings &&
        allBookings.map((booking, i) => (
          <SingleBooking key={i} data={booking} />
        ))}
    </div>
  );
};

export default AllBookings;
