import dayjs from "dayjs";
import CryptoJS from "crypto-js";
var DB = require("../dbconfig2.js");

export default async function handler(req, res) {
  //Booking Form validation
  let isValid = true;
  let errors = {};
  let bookingID;
  let hash;

  let {
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
  } = req.body;
  //date:
  if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
    isValid = false;
    errors.date = "La fecha no es valida";
  }
  //time:
  if (hour === null || !(hour.charAt(2) === ":")) {
    isValid = false;
    errors.time = "No ha elegido una hora válida";
  }
  //comensales:
  if (comensales.match(/^[0-9]+$/) === null || comensales == 0) {
    isValid = false;
    errors.comensales = "No ha introducido los comensales";
  }
  //tronas
  if (tronas.match(/^[0-9]+$/) === null && tronas !== "0" && tronas !== "") {
    isValid = false;
    errors.tronas = "Valor incorrecto de tronas";
  } else if (tronas !== 0) {
    tronas = parseInt(tronas);
  }

  //carros
  if (carros === null) carros = 0;
  if (carros.match(/^[0-9]+$/) === null && carros !== "0" && carros !== "") {
    isValid = false;
    errors.carros = "Valor incorrecto de carros";
  } else if (carros !== 0) {
    carros = parseInt(carros);
  }
  //nombre
  if (nombre.length < 3) {
    isValid = false;
    errors.nombre = "Debe contener 3 o más caracteres";
  }
  //apellidos
  if (apellidos.length < 3) {
    isValid = false;
    errors.apellidos = "Debe contener 3 o más caracteres";
  }
  //telefono
  if (phone.length !== 9) {
    isValid = false;
    errors.phone =
      "El número de teléfono tiene que tener una longitud de 9 caracteres";
  } else if (phone.match(/^[0-9]+$/) === null) {
    isValid = false;
    errors.phone = "El número de teléfono solo puede contener números";
  }
  //preferencias contacto
  if (prefCont === "") {
    isValid = false;
    errors.prefCont = "Seleccione una preferencia de contacto";
  }

  if (!isValid) {
    console.log("Datos form invalidos")
    res.status(200).json({ errors });
    return;
  }

  if (userID === null) {
    //hay que crear el usuario antes de guardar la reserva
    console.log("Creando usuario")
    let query =
      "INSERT INTO tblfidelizacion (nombre, apellidos, phone, prefCont) VALUES (?, ?, ?, ?)";
    let values = [nombre, apellidos, "+34" + phone, prefCont];
    DB.query(query, values, function (data, error) {
      if (error) {
        res.status(500).json("error creando usuario")
        return;
      } else {
        console.log(data)
        userID = data.insertId
        console.log("Usuario Creado: ", userID)
        //creamos la reserva
        console.log("Creando la reserva")
        hash = CryptoJS.SHA256(new Date().toJSON()).toString(CryptoJS.enc.Base64);
        let query2 =
          "INSERT INTO tblreservas (idCliente, comensales, carros, tronas, fecha_reserva, notasReserva, intolerancias, hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        let values2 = [
          userID,
          comensales,
          carros,
          tronas,
          `${year}-${month}-${day} ${hour}:00`,
          comentario,
          intolerancias,
          hash,
        ];
        // const reserva = dbconnection.execute(query2, values2);
        DB.query(query2, values2, function (data, error) {
          if (error) {
            console.log("Error creando la reserva")
            res.status(500).json({ error: error.message });
            return;
          }
          console.log("Reserva creada")
          res.status(200).json({
            bookingID: data.insertId,
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
            hash,
          });
          return;
        });

      }

    });
  }

  if (userID !== null) {
    //actualizamos prefCont
    console.log("Actualizando prefcont del usuario: ", userID)
    let query = "UPDATE tblfidelizacion SET prefCont = ? WHERE id = ?";
    let values = [prefCont, userID];
    DB.query(query, values, function (data, error) {
      if (error) {
        res.status(500).json("Error actualizando pref. cont.");
        return;
      } else {
        console.log("preferencias actualizadas")
        //creamos la reserva
        console.log("Creando la reserva")
        hash = CryptoJS.SHA256(new Date().toJSON()).toString(CryptoJS.enc.Base64);
        let query2 =
          "INSERT INTO tblreservas (idCliente, comensales, carros, tronas, fecha_reserva, notasReserva, intolerancias, hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        let values2 = [
          userID,
          comensales,
          carros,
          tronas,
          `${year}-${month}-${day} ${hour}:00`,
          comentario,
          intolerancias,
          hash,
        ];
        // const reserva = dbconnection.execute(query2, values2);
        DB.query(query2, values2, function (data, error) {
          if (error) {
            console.log("Error creando la reserva")
            res.status(500).json({ error: error.message });
            return;
          }
          console.log("Reserva creada")
          res.status(200).json({
            bookingID: data.insertId,
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
            hash,
          });
          return;
        });
      }

    });
  }

}

