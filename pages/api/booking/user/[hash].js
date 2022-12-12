var DB = require("../../dbconfig2.js");
//get all booking with some booking hash
export default async function handler(req, res) {
  const hash = decodeURIComponent(req.query.hash);
  let idCliente = 0;
  console.log(hash);
  const query = "SELECT idCliente FROM tblreservas WHERE hash = ?";
  const values = [hash];
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    if (data.length > 0) {
      idCliente = data[0].idCliente;
      console.log("idCliente", idCliente);
      const query2 =
        "SELECT * FROM tblreservas WHERE idCliente = ? ORDER BY fecha_reserva DESC";
      const values2 = [idCliente];
      DB.query(query2, values2, function (data, error) {
        console.log(data);
        if (error) res.status(500).json({ error: error.message });
        data.length > 0 ? res.status(200).json(data) : res.status(204).json({});
      });
    } else {
      res.status(204).json({});
    }
  });
}
