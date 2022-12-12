// import { dbconnection } from "../dbconfig";
// var dbconnection = require("../../dbconfig2.js");

// export default async function handler(req, res) {
//   try {
//     const query =
//       "SELECT id as userID, nombre, apellidos, prefCont FROM tblfidelizacion WHERE phone = ?";
//     const values = ["+34" + req.query.phone];
//     let [results] = await dbconnection.execute(query, values);

//     if (results.length === 1) {
//       // results[0].nombre =
//       //   results[0].nombre.charAt(0) + "*".repeat(results[0].nombre.length - 1);
//       results[0].apellidos =
//         results[0].apellidos.charAt(0) +
//         "*".repeat(results[0].apellidos.length - 1);
//       res.status(200).json(results[0]);
//     } else {
//       res.status(204).json({});
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

var DB = require("../dbconfig2.js");

export default async function handler(req, res) {
  const query =
    "SELECT id as userID, nombre, apellidos, prefCont FROM tblfidelizacion WHERE phone = ?";
  const values = ["+34" + req.query.phone];
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    if (data.length === 1) {
      data[0].apellidos =
        data[0].apellidos.charAt(0) + "*".repeat(data[0].apellidos.length - 1);
      res.status(200).json(data[0]);
    } else {
      res.status(204).json({});
    }
  });
}
