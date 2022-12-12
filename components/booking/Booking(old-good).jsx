import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { ThreeDots } from "react-loader-spinner";
import { MORNING, AFTERNOON } from "../global";
import { useRouter } from "next/router";
import { MdExpandMore, MdExpandLess } from "react-icons/md"
import classes from "../../styles/Booking.module.css";

const Booking = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).add(1, "day")
  );
  const [closedDays, setClosedDays] = useState([]);
  const [closedDaysRAW, setClosedDaysRAW] = useState([]);
  const [openDays, setOpenDays] = useState([]);
  const [openDaysRAW, setOpenDaysRAW] = useState([]);
  const [closedDaysOfWeek, setClosedDaysOfWeek] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [prefCont, setPrefCont] = useState("whatsapp");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [lsData, setLsData] = useState(null);

  const hourRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();
  const apellidosRef = useRef();
  const comensalesRef = useRef();
  const tronasRef = useRef();
  const carrosRef = useRef();
  const comentarioRef = useRef();

  useEffect(() => {
    let ls = localStorage.getItem("lastBookingHash");
    if (ls !== null && !isDataLoaded) {
      setLsData(JSON.parse(ls));
    }
    fetchClosedDaysOfWeek();
    fetchOpenDays();
    fetchClosedDays();

    setIsDataLoaded(true);
  }, [isDataLoaded]);

  useEffect(() => {
    const getAvailableHours = () => {
      let hours = [];
      let openMorning = true;
      let openAfternoon = true;
      const weekDay = selectedDate.day();
      const date = `${selectedDate.year()}-${selectedDate.month() + 1
        }-${selectedDate.date()}`;

      //miramos horario normal
      const opensOnMorning =
        closedDaysOfWeek.filter(
          (day) =>
            day["tipo"] === "openClose" &&
            day["intdayOfWeek"] - (day.intdayOfWeek === 7 && 7) === weekDay &&
            day["iniHour1"] === "00:00:00"
        ).length === 1;

      if (opensOnMorning) openMorning = false;

      const opensOnAfternoon =
        closedDaysOfWeek.filter(
          (day) =>
            day["tipo"] === "openClose" &&
            day["intdayOfWeek"] - (day.intdayOfWeek === 7 && 7) === weekDay &&
            day["iniHour2"] === "00:00:00"
        ).length === 1;

      if (opensOnAfternoon) openAfternoon = false;

      //Miramos si ese dia está cerrado parcialmente
      const closedIndex = closedDaysRAW.findIndex(
        (day) => date === `${day["year"]}-${day["month"]}-${day["day"]}`
      );
      const closedDayInfo =
        closedIndex !== -1 ? closedDaysRAW[closedIndex] : null;
      if (closedDayInfo !== null) {
        if (closedDayInfo["info_day"] === "MORNING") {
          openMorning = false;
          openAfternoon = true;
        }
        if (closedDayInfo["info_day"] === "AFTERNOON") {
          openMorning = true;
          openAfternoon = false;
        }
      }
      //miramos si ese día está abierto parcialmente
      const openIndex = openDaysRAW.findIndex(
        (day) => date === `${day["year"]}-${day["month"]}-${day["day"]}`
      );
      const openDayInfo = openIndex !== -1 ? openDaysRAW[openIndex] : null;
      if (openDayInfo !== null) {
        if (openDayInfo["info_day"] === "MORNING") {
          openMorning = true;
          openAfternoon = false;
        }
        if (openDayInfo["info_day"] === "AFTERNOON") {
          openMorning = false;
          openAfternoon = true;
        }
        if (openDayInfo["info_day"] === "ALL_DAY") {
          openMorning = true;
          openAfternoon = true;
        }
      }

      if (openMorning) {
        hours = hours.concat(MORNING);
      }

      if (openAfternoon) {
        hours = hours.concat(AFTERNOON);
      }
      setAvailableHours(hours);
    };

    getAvailableHours();
  }, [selectedDate, closedDays, closedDaysOfWeek, closedDaysRAW, openDaysRAW]);

  const fetchClosedDaysOfWeek = () => {
    fetch("/api/schedule/closedDaysOfWeek")
      .then((response) => (response ? response.json() : []))
      .then((data) => {
        setClosedDaysOfWeek(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchClosedDays = () => {
    fetch("/api/schedule/closedDays")
      .then((response) => response.json())
      .then((data) => {
        setClosedDaysRAW(data);
        const dates = data
          .filter((day) => day["info_day"] === "ALL_DAY")
          .map((day) => dayjs(`${day.year}-${day.month}-${day.day}`));
        setClosedDays(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOpenDays = () => {
    fetch("/api/schedule/openDays")
      .then((response) => response.json())
      .then((data) => {
        setOpenDaysRAW(data);
        const dates = data.map((day) =>
          dayjs(`${day.year}-${day.month}-${day.day}`)
        );
        setOpenDays(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findClientHandler = (e) => {
    if (e.target.value.length !== 9) {
      setUserData(null);
      nameRef.current.value = "";
      nameRef.current.disabled = false;
      apellidosRef.current.value = "";
      apellidosRef.current.disabled = false;
      return;
    }
    fetch(`/api/users?phone=${e.target.value}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          setUserData(null);
          setPrefCont("whatsapp");
          nameRef.current.value = "";
          nameRef.current.disabled = false;
          apellidosRef.current.value = "";
          apellidosRef.current.disabled = false;
          throw new Error
        }
      })
      .then((data) => {
        setUserData(data);
        setPrefCont(data.prefCont);
        nameRef.current.value = data.nombre;
        nameRef.current.disabled = true;
        apellidosRef.current.value = data.apellidos;
        apellidosRef.current.disabled = true;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateFormHandler = (e) => {
    e.preventDefault();
    setErrors(null);
    setShowSpinner(true);
    const userID = userData ? userData.userID : null;
    const hour = hourRef.current.selectedOptions[0]
      ? hourRef.current.selectedOptions[0].value
      : null;
    const day =
      selectedDate.date().toString().length === 1
        ? "0" + selectedDate.date()
        : selectedDate.date();
    const month = selectedDate.month() + 1;
    const year = selectedDate.year();
    const date = `${year}-${month}-${day}`;
    const phone = phoneRef.current.value;
    const nombre = nameRef.current.value;
    const apellidos = apellidosRef.current.value;
    const comensales = comensalesRef.current.value;
    const tronas = tronasRef.current.value || "0";
    const carros = carrosRef.current.value || "0";
    // const intolerancias = intoleranciasRef.current.value;
    const intolerancias = "";
    const comentario = comentarioRef.current.value;
    const formData = {
      userID,
      nombre,
      apellidos,
      phone,
      date,
      day,
      month,
      year,
      hour,
      comensales,
      tronas,
      carros,
      intolerancias,
      comentario,
      prefCont,
    };

    fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("errors")) {
          setErrors(data.errors);
          setShowSpinner(false);
        }
        if (data.hasOwnProperty("bookingID")) {
          localStorage.setItem("lastBookingHash", JSON.stringify(data));
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          router.push(`/booking/${encodeURIComponent(data.hash)}`);
        }
      })
      .catch((err) => {
        console.log("errores", err);
      });
  };
  if (!isDataLoaded) return;

  return (
    <>
      {showSpinner && (
        <div className={classes.spinner}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      {lsData && (
        <button
          className="btn btn-secondary"
          onClick={() =>
            router.push(`/booking/user/${encodeURIComponent(lsData.hash)}`)
          }
        >
          Mis reservas
        </button>
      )}
      <form className={classes.booking} onSubmit={validateFormHandler}>
        <div className={classes.col}>
          <div className={classes.row}>
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              closedDays={closedDays}
              closedDaysOfWeek={closedDaysOfWeek}
              openDays={openDays}
            />
            <span className={classes.error}>
              {errors && errors.date && errors.date}
            </span>
          </div>
          <div className={classes.row}>
            <label htmlFor="time" className="form-label">
              Hora
            </label>
            <TimePicker availableHours={availableHours} hourRef={hourRef} />
            <span className={classes.error}>
              {errors && errors.time && errors.time}
            </span>
          </div>
          <div className={classes["row-3"]}>
            <label htmlFor="comensales" className="form-label mt-3">
              Comensales
            </label>
            <input
              type="number"
              min="0"
              max="99"
              name="comensales"
              className="form-control text-center"
              ref={comensalesRef}
              placeholder="Comensales"
              required
            />
          </div>

          <div className={classes["row-3"]}>
            <label htmlFor="tronas" className="form-label mt-3">
              Tronas
            </label>
            <input
              type="number"
              min="0"
              max="10"
              name="tronas"
              className="form-control text-center"
              ref={tronasRef}
              placeholder="Tronas"
            />
          </div>

          <div className={classes["row-3"]}>
            <label htmlFor="carros" className="form-label mt-3">
              Carros
            </label>
            <input
              type="number"
              min="0"
              max="10"
              name="carros"
              className="form-control text-center"
              ref={carrosRef}
              placeholder="Carros"
            />
          </div>
          <div className={classes.row}>
            <span className={classes.error}>
              {errors && errors.comensales && errors.comensales}
            </span>

            <span className={classes.error}>
              {errors && errors.tronas && errors.tronas}
            </span>

            <span className={classes.error}>
              {errors && errors.carros && errors.carros}
            </span>
          </div>
          <div className={classes.row}>
            <label htmlFor="comentario" className="form-label mt-3" onClick={() => { setShowComments((prev) => !prev) }}>
              ¿Algún comentario? {showComments ? <MdExpandLess /> : <MdExpandMore />}
            </label>
            {showComments && (<textarea
              htmlFor="comentario"
              className="form-control form-textarea"
              ref={comentarioRef}
            ></textarea>)}
          </div>
        </div>

        <div className={classes.col}>
          <div className={classes.row}>
            <label htmlFor="phone" className="form-label mt-3">
              Teléfono móvil
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              onKeyUp={findClientHandler}
              ref={phoneRef}
              maxLength="9"
              minLength="9"
              placeholder="Teléfono móvil"
              required
            />
            <span className={classes.error}>
              {errors && errors.phone && errors.phone}
            </span>
          </div>
          <div className={classes.row}>
            <label className="form-label mt-3">
              ¿Por dónde te respondemos?
            </label>
            <div className="form-check w-100">
              <input
                type="radio"
                className="form-check-input"
                value="whatsapp"
                name="prefCont"
                id="prefCont1"
                onChange={(e) => setPrefCont(e.target.value)}
                checked={prefCont === "whatsapp"}
              />
              <label className="form-check-label" htmlFor="prefCont1">
                WhatsApp
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="sms"
                name="prefCont"
                id="prefCont2"
                onChange={(e) => setPrefCont(e.target.value)}
                checked={prefCont === "sms"}
              />
              <label className="form-check-label" htmlFor="prefCont2">
                SMS
              </label>
            </div>
          </div>
          <div className={classes.row}>
            <label htmlFor="name" className="form-label mt-3">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              ref={nameRef}
              placeholder="Nombre"
              required
            />
            <span className={classes.error}>
              {errors && errors.nombre && errors.nombre}
            </span>
          </div>
          <div className={classes.row}>
            <label htmlFor="surname" className="form-label mt-3">
              Apellidos
            </label>
            <input
              type="text"
              name="surname"
              className="form-control"
              ref={apellidosRef}
              placeholder="Apellidos"
              required
            />
            <span className={classes.error}>
              {errors && errors.apellidos && errors.apellidos}
            </span>
          </div>
          {/* <div className={classes.row}>
          <label htmlFor="intolerancias" className="form-label mt-3">
            Intolerancias
          </label>
          <input
            type="text"
            name="intolerancias"
            className="form-control"
            ref={intoleranciasRef}
            placeholder="Intolerancias"
          />
        </div> */}
        </div>
        <div className={classes["col-100"]}>
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="terminos"
              id="terminos"
              required
            />
            <label
              className="form-check-label"
              htmlFor="terminos"
              style={{ fontWeight: "bold" }}
            >
              Autorizo a El Viejo Roble a utilizar mi teléfono móvil para
              enviarme notificaciones sobre mi reserva.
            </label>
          </div>
        </div>

        <div className={classes.submit}>
          <button type="submit" className="btn btn-primary">
            Reservar
          </button>
        </div>
      </form>
    </>
  );
};

export default Booking;
