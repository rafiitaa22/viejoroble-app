import dayjs from "dayjs";
// import { dbconnection } from "../dbconfig";
import CryptoJS from "crypto-js";

// export default async function handler(req, res) {
//   //Booking Form validation
//   let isValid = true;
//   let errors = {};
//   let bookingID;
//   let hash;

//   let {
//     userID,
//     nombre,
//     apellidos,
//     phone,
//     date,
//     day,
//     month,
//     year,
//     hour,
//     comensales,
//     tronas,
//     carros,
//     intolerancias,
//     comentario,
//     prefCont,
//   } = req.body;
//   //date:
//   if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
//     isValid = false;
//     errors.date = "La fecha no es valida";
//   }
//   //time:
//   if (!(hour.charAt(2) === ":")) {
//     isValid = false;
//     errors.time = "No ha elegido una hora válida";
//   }
//   //comensales:
//   if (comensales.match(/^[0-9]+$/) === null || comensales == 0) {
//     isValid = false;
//     errors.comensales = "No ha introducido los comensales";
//   }
//   //tronas
//   if (tronas.match(/^[0-9]+$/) === null && tronas !== "0" && tronas !== "") {
//     isValid = false;
//     errors.tronas = "Valor incorrecto de tronas";
//   } else if (tronas !== 0) {
//     tronas = parseInt(tronas);
//   }

//   //carros
//   if (carros.match(/^[0-9]+$/) === null && carros !== "0" && carros !== "") {
//     isValid = false;
//     errors.carros = "Valor incorrecto de carros";
//   } else if (carros !== 0) {
//     carros = parseInt(carros);
//   }
//   //nombre
//   if (nombre.length < 3) {
//     isValid = false;
//     errors.nombre = "No ha introducido el nombre";
//   }
//   //apellidos
//   if (apellidos.length < 3) {
//     isValid = false;
//     errors.apellidos = "No ha introducido los apellidos";
//   }
//   //telefono
//   if (phone.length !== 9) {
//     isValid = false;
//     errors.phone =
//       "El número de teléfono tiene que tener una longitud de 9 caracteres";
//   } else if (phone.match(/^[0-9]+$/) === null) {
//     isValid = false;
//     errors.phone = "El número de teléfono solo puede contener números";
//   }
//   //preferencias contacto
//   if (prefCont === "") {
//     isValid = false;
//     errors.prefCont = "Seleccione una preferencia de contacto";
//   }

//   if (userID === null) {
//     //hay que crear el usuario antes de guardar la reserva
//     try {
//       let query =
//         "INSERT INTO tblfidelizacion (nombre, apellidos, phone, prefCont) VALUES (?, ?, ?, ?)";
//       let values = [nombre, apellidos, "+34" + phone, prefCont];
//       const user = await dbconnection.execute(query, values);
//       userID = user[0].insertId;
//       console.log(userID);
//     } catch (error) {
//       isValid = false;
//       errors.newUser = error.message;
//     }
//   }

//   if (!isValid) {
//     res.status(200).json({ errors });
//   } else {
//     //creamos la reserva
//     try {
//       hash = CryptoJS.SHA256(new Date().toJSON()).toString(CryptoJS.enc.Base64);
//       let query2 =
//         "INSERT INTO tblreservas (idCliente, comensales, carros, tronas, fecha_reserva, notasReserva, intolerancias, hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//       let values2 = [
//         userID,
//         comensales,
//         carros,
//         tronas,
//         `${year}-${month}-${day} ${hour}:00`,
//         comentario,
//         intolerancias,
//         hash,
//       ];
//       const reserva = await dbconnection.execute(query2, values2);
//       bookingID = reserva[0].insertId;
//     } catch (error) {
//       isValid = false;
//       errors.booking = error.message;
//     }
//   }
//   if (isValid) {
//     res.status(200).json({
//       bookingID,
//       userID,
//       nombre,
//       apellidos,
//       phone,
//       date,
//       day,
//       month,
//       year,
//       hour,
//       comensales,
//       tronas,
//       carros,
//       intolerancias,
//       comentario,
//       prefCont,
//       hash,
//     });
//   } else {
//     res.status(500).json(errors);
//   }
// }

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
    errors.nombre = "No ha introducido el nombre";
  }
  //apellidos
  if (apellidos.length < 3) {
    isValid = false;
    errors.apellidos = "No ha introducido los apellidos";
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

  if (userID === null && isValid) {
    //hay que crear el usuario antes de guardar la reserva
    console.log("Creando usuario")
    let query =
      "INSERT INTO tblfidelizacion (nombre, apellidos, phone, prefCont) VALUES (?, ?, ?, ?)";
    let values = [nombre, apellidos, "+34" + phone, prefCont];
    await DB.query(query, values, function (data, error) {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      if (data.length > 0) {
        userID = data[0].insertId
        console.log("Usuario Creado: ", userID)
      } else {
        res.status(500).json("error creando usuario")
        return
      }
    });
  }

  if (userID !== null && isValid) {
    //actualizamos prefCont
    console.log("Actualizando prefcont del usuario: ", userID)
    let query = "UPDATE tblfidelizacion SET prefCont = ? WHERE id = ?";
    let values = [prefCont, userID];
    await DB.query(query, values, function (data, error) {
      if (error) {
        res.status(500).json("Error actualizando pref. cont.");
        return;
      } else {
        console.log("preferencias actualizadas")
      }

    });
  }

  if (!isValid) {
    console.log("Datos form invalidos")
    res.status(200).json({ errors });
    return;
  } else {
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
    // const reserva = await dbconnection.execute(query2, values2);
    await DB.query(query2, values2, function (data, error) {
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
}
