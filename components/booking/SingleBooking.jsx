import React, { useState } from "react";
import classes from "../../styles/AllBookings.module.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import StatusIcon from "./StatusIcon";
import { MdPeople } from "react-icons/md";
import { GiDirectorChair } from "react-icons/gi";
import { TbBabyCarriage } from "react-icons/tb";

const SingleBooking = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  dayjs.locale("es"); // use locale
  return (
    <div
      className={`${classes.singleBooking} ${expanded && classes.expanded}`}
      onClick={() => setExpanded((estado) => !estado)}
    >
      <div className={classes.title}>
        <h1>
          {`${dayjs(data["fecha_reserva"]).format("DD MMMM")} ${dayjs(
            data["fecha_reserva"]
          ).format("HH:mm")}h`}
        </h1>
        <div className={classes.icon}>
          <StatusIcon
            status={data.estado}
            fontSize={"1.1em"}
            width={"30px"}
            height={"30px"}
          />
        </div>
      </div>
      {expanded && (
        <>
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
          {data.notasReserva && (
            <div className={classes.additionalInfo}>
              <div style={{ width: "100%", fontSize: "0.8em" }}>
                {data.notasReserva}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleBooking;
