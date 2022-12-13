export const MORNING = [
  "Mediodía",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
];

export const AFTERNOON = [
  "Noche",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
];

export const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const ESTADOS = {
  0: {
    title: `¡Reserva enviada {nombre}!`,
    text: `Hemos recibido tu reserva para el {weekDay}, {day} de {month} del {year} las {hour}h y te
    la confirmaremos por {prefCont} en la mayor brevedad posible.`,
    statusText: "Pendiente de aceptar",
    color: "white",
    backgroundColor: "orange",
    fontSize: "6em",
  },
  1: {
    title: `¡Reserva aceptada {nombre}!`,
    text: `Hemos aceptado tu reserva para el día {day} de {month} del {year} las {hour}h. ¡Estamos ansioso por verte de nuevo!`,
    statusText: "Aceptada",
    color: "white",
    backgroundColor: "green",
  },
  2: {
    title: `Reserva cancelada`,
    text: `Hemos cancelado tu reserva para el día {day} de {month} del {year} las {hour}h.`,
    statusText: "Cancelada",
    color: "white",
    backgroundColor: "red",
  },
  3: {
    title: `Reserva anulada`,
    text: `Hemos anulado tu reserva para el día {day} de {month} del {year} las {hour}h.`,
    statusText: "Anulada",
    color: "white",
    backgroundColor: "red",
  },
  4: {
    title: `¡Te hemos visto {nombre}!`,
    text: `¡Te vimos por el restaurante el día {day} de {month}, esperamos volver a verte pronto!`,
    statusText: "Show",
    color: "white",
    backgroundColor: "green",
  },
  5: {
    title: `No te hemos visto...`,
    text: `Que raro, parece que algo salió mal el día {day} de {month}... Te recordamos que puede anular la reserva llamándonos al 937 462 896 cuando quieras.`,
    statusText: "No show",
    color: "white",
    backgroundColor: "red",
  },
};
