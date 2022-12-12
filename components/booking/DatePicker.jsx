import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import "dayjs/locale/es";
import dayjs from "dayjs";

const maxDate = dayjs(new Date()).add(6, "month").toDate();
const minDate = dayjs(new Date()).add(1, "day").toDate();

const DatePicker = (props) => {
  //.day() -> domingo = 0, lunes = 1 ,....
  //intDayOfWeek -> lunes = 1, .. domingo = 7
  const isClosedDay = (date) => {
    return (
      (props.closedDays.findIndex((day) => {
        return (
          day.date() == date.date() &&
          day.month() == date.month() &&
          day.year() == date.year()
        );
      }) !== -1 ||
        props.closedDaysOfWeek
          .filter(
            (day) =>
              day["tipo"] === "openClose" &&
              day["iniHour1"] === "00:00:00" &&
              day["endHour1"] === "00:00:00" &&
              day["iniHour2"] === "00:00:00" &&
              day["endHour2"] === "00:00:00"
          )
          .findIndex((day) => {
            return (
              day.intdayOfWeek - (day.intdayOfWeek === 7 && 7) === date.day()
            );
          }) !== -1) &&
      props.openDays.findIndex((day) => {
        return (
          day.date() == date.date() &&
          day.month() == date.month() &&
          day.year() == date.year()
        );
      }) === -1
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}> */}
      <CalendarPicker
        date={props.selectedDate}
        onChange={(newDate) => props.setSelectedDate(newDate)}
        disablePast={true}
        shouldDisableDate={isClosedDay}
        maxDate={maxDate}
        minDate={minDate}
      />
      {/* </Grid>
          </Grid> */}
    </LocalizationProvider>
  );
};

export default DatePicker;
